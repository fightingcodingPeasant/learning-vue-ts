# Session 7: 路由 + Pinia 类型安全 — 导航和状态管理都有类型保护

**日期：** 2026-07-21  
**目标：** 掌握 Vue Router 路由参数类型 + Pinia Store 类型定义  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. Vue Router 类型安全

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 编程式导航：TS 会检查路径是否存在
router.push('/about')

// 带参数跳转
router.push({ name: 'User', params: { id: '123' }, query: { tab: 'profile' } })

// 读取路由参数
console.log(route.params.id)   // string
console.log(route.query.tab)   // string | undefined
</script>
```

**路由配置（router/index.ts）：**
```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
    { path: '/user/:id', name: 'User', props: true, component: () => import('../views/UserView.vue') },
  ],
})

export default router
```

**关键：** `props: true` 让路由参数自动作为 prop 传给组件，TS 可以通过 `defineProps` 声明。

---

### 2. Pinia Store 类型安全

```typescript
// stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  subtotal: number
}

export const useCartStore = defineStore('cart', () => {
  // state — 响应式数据
  let items = ref<CartItem[]>([])

  // getter — 计算属性
  let total = computed(() => items.value.reduce((sum, item) => sum + item.subtotal, 0))

  // action — 修改数据的方法
  function addItem(product: { id: number; name: string; price: number }) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
      existing.subtotal = existing.price * existing.quantity
    } else {
      items.value.push({
        id: product.id, name: product.name, price: product.price,
        quantity: 1, subtotal: product.price,
      })
    }
  }

  function clear() { items.value = [] }

  return { items, total, addItem, clear }
})
```

**在组件中使用：**
```vue
<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
// cart.items, cart.total, cart.addItem() — 全部有类型保护
</script>
```

**main.ts 注册：**
```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
```

---

## 三种状态管理方案对比

| 方案 | 适用场景 | 类型保护 |
|------|---------|---------|
| `ref/reactive` | 组件内部状态 | 完整 |
| `Composable` | 跨组件逻辑复用 | 完整 |
| `Pinia Store` | 全局共享状态 | 完整 |

---

## 完整示例代码

### RouterDemo.vue — Vue Router 类型安全

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function navigateTo(path: string) {
  router.push(path)
}

function navigateWithParams() {
  router.push({ name: 'User', params: { id: '123' }, query: { tab: 'profile' } })
}
</script>

<template>
  <div>
    <button @click="navigateTo('/')">首页</button>
    <button @click="navigateWithParams">用户详情</button>
    <p>当前路径：{{ route.path }}</p>
  </div>
</template>
```

### PiniaCartDemo.vue — Pinia Store 使用

```vue
<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

interface Product {
  id: number
  name: string
  price: number
}

const products: Product[] = [
  { id: 1, name: 'Vue 3 实战', price: 99 },
]

function addToCart(product: Product) {
  cart.addItem(product)
}
</script>

<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ¥{{ product.price }}
        <button @click="addToCart(product)">加入购物车</button>
      </li>
    </ul>
    <p>总计：¥{{ cart.total }}</p>
    <button @click="cart.clear()">清空购物车</button>
  </div>
</template>
```

---

## 常见错误

| 错误 | 说明 |
|------|------|
| 忘记在 main.ts 注册 router/pinia | 运行时 `Cannot read properties of undefined (reading 'push')` |
| Pinia store 没有 return | 组件中访问不到 state/getter/action |
| 路由参数没有 props 声明 | 子组件无法直接接收 route.params |
| defineStore 的回调函数写成箭头函数 | 箭头函数会丢失 this 上下文（但 Composition API 写法不会） |

---

## 复盘问题

- **Q: useRoute() 和 useRouter() 的区别？**  
  A: `useRoute()` 获取当前路由信息（path、params、query），`useRouter()` 用于导航（push、replace）。

- **Q: Pinia store 怎么在组件中使用？**  
  A: 导入 store 后直接调用 `const store = useXxxStore()`，然后访问 store 的 state/getter/action。store 是全局单例，任何组件都能共享。

- **Q: 路由参数类型怎么获取？**  
  A: 使用 `props: true` 让路由参数自动作为 prop 传给组件，然后在子组件用 `defineProps<{ id: string }>()` 声明。

---

## 学习笔记

> **Vue Router** — 创建路由实例，配置 routes 数组。`useRouter()` 用于导航，`useRoute()` 用于读取当前路由信息。`props: true` 让路由参数自动作为 prop 传给子组件。

> **Pinia Store** — 用 `defineStore(name, () => { ... })` 定义，内部用 `ref` 定义 state，`computed` 定义 getter，普通函数定义 action。返回的对象就是组件能访问的所有内容。

> **类型保护贯穿始终** — 从路由配置到 store 的 state/getter/action，每一步都有 TS 类型检查。

---

## 费曼复述

> Session 7 学了两个核心工具：

> 1. **Vue Router** — 页面间导航。`createRouter()` 创建路由实例，配置 routes 数组。`useRouter().push()` 编程式导航，`useRoute().path/params/query` 读取当前路由信息。`props: true` 让路由参数自动传给子组件。

> 2. **Pinia Store** — 全局状态管理。`defineStore('name', () => { ... })` 用 Composition API 风格定义。`ref` 定义 state，`computed` 定义 getter，函数定义 action。store 是全局单例，任何组件都能通过 `useStore()` 访问。

> 选择策略：**组件内部状态用 ref，跨组件逻辑用 Composable，全局共享状态用 Pinia。**
