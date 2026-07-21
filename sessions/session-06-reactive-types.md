# Session 6: 响应式系统类型推断 — 让 TS 正确推断响应式数据的类型

**日期：** 2026-07-19  
**目标：** 掌握 ref<T>、reactive、shallowRef、readonly 的类型行为  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. `ref<T>()` — 泛型手动指定类型

```vue
<script setup lang="ts">
import { ref } from 'vue'

// 基础类型：TS 自动推断，不需要写泛型
let userName = ref('小明')        // string
let userAge = ref(18)             // number
let isActive = ref(true)          // boolean

// 复杂类型必须写泛型，否则 TS 不知道是什么
interface User {
  name: string
  age: number
  email?: string
}

// ref<User> — 告诉 TS：这个 ref 里面装的是 User 对象
let user = ref<User>({
  name: '小明',
  age: 18,
})
</script>
```

**关键：** `<T>` 是 TypeScript 泛型，告诉编译器 ref 内部的数据类型。省略后变成 `any`，失去类型保护。

---

### 2. `reactive()` — 对象/数组的类型推导

```vue
<script setup lang="ts">
import { reactive } from 'vue'

interface Product {
  name: string
  price: number
  stock: number
}

// reactive 不需要泛型，TS 会根据传入的对象自动推断类型
let product = reactive<Product>({
  name: 'Vue 3 实战',
  price: 99,
  stock: 100,
})
</script>
```

**关键：** reactive 的泛型可以写也可以不写。写了更明确，不写 TS 也能推断。

---

### 3. `shallowRef` vs `ref` — 性能差异

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue'

// ref：深度响应式，对象内部任何属性变化都能触发更新
let deepObj = ref({
  name: 'Vue',
  version: '3.5',
  features: ['Composition API', 'TypeScript'],
})

// shallowRef：浅层响应式，只追踪整体替换，不追踪内部属性变化
let shallowObj = shallowRef({
  name: 'React',
  version: '18',
  features: ['Hooks', 'Virtual DOM'],
})

function updateDeep() {
  deepObj.value.name = 'Vue 3' // ✅ ref 会检测到
}

function updateShallow() {
  // shallowObj.value.name = 'React 18' // ❌ shallowRef 不会检测到！
  shallowObj.value = { // ✅ 需要整体替换
    name: 'React 18',
    version: '18.2',
    features: ['Server Components', 'RSC'],
  }
}
</script>
```

**区别：**
| | ref | shallowRef |
|--|-----|------------|
| 响应式级别 | 深度（递归） | 浅层（只追踪引用） |
| 性能 | 大对象稍慢 | 大对象更快 |
| 适合场景 | 普通对象/数组 | 超大对象、不常变动的数据 |

---

### 4. `readonly()` — 只读状态

```vue
<script setup lang="ts">
import { ref, readonly } from 'vue'

let count = ref(0)

// readonly 创建一个只读的代理对象，不能修改
let readonlyCount = readonly(count)

function increment() {
  count.value++ // ✅ 原始 ref 可以修改
  // readonlyCount.value++ // ❌ 编译错误！
}
</script>
```

**用途：** 保护数据不被意外修改。比如组件 A 把数据传给组件 B，用 readonly 防止 B 修改 A 的数据。

---

## 四种响应式工具速查

| 工具 | 用法 | 适合场景 |
|------|------|---------|
| `ref<T>()` | `let x = ref<T>(value)` | 基本类型或需要泛型的复杂类型 |
| `reactive()` | `let obj = reactive({...})` | 对象/数组，TS 自动推断 |
| `shallowRef()` | `let x = shallowRef(value)` | 超大对象，只需要浅层响应式 |
| `readonly()` | `let x = readonly(ref)` | 创建只读代理，防止外部修改 |

---

## 完整示例代码

### RefTypeDemo.vue — ref<T> 泛型

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface User {
  name: string
  age: number
  email?: string
}

let user = ref<User>({
  name: '小明',
  age: 18,
})

function updateName() {
  user.value.name = '小红'
}

function updateEmail() {
  user.value.email = 'xiaohong@example.com'
}
</script>
```

### ReactiveDemo.vue — reactive 类型推导

```vue
<script setup lang="ts">
import { reactive } from 'vue'

interface Product {
  name: string
  price: number
  stock: number
}

let product = reactive<Product>({
  name: 'Vue 3 实战',
  price: 99,
  stock: 100,
})
</script>
```

### ShallowRefDemo.vue — shallowRef vs ref

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue'

let deepObj = ref({ name: 'Vue', version: '3.5' })
let shallowObj = shallowRef({ name: 'React', version: '18' })

function updateDeep() {
  deepObj.value.name = 'Vue 3'
}

function updateShallow() {
  shallowObj.value = { name: 'React 18', version: '18.2' }
}
</script>
```

### ReadonlyDemo.vue — readonly

```vue
<script setup lang="ts">
import { ref, readonly } from 'vue'

let count = ref(0)
let readonlyCount = readonly(count)

function increment() {
  count.value++ // ✅ 原始 ref 可以修改
}
</script>
```

---

## 常见错误

| 错误 | 说明 |
|------|------|
| 复杂类型不写泛型 | `ref({name:'X'})` 会变成 `Ref<{name:string}>` 而不是你想要的接口类型 |
| shallowRef 修改内部属性 | `shallowObj.value.name = 'Y'` 不会触发更新，需要整体替换 |
| 对 readonly 对象直接赋值 | `readonlyCount.value++` 编译错误，必须改原始 ref |
| reactive 解构丢失响应性 | `const { name } = reactive({...})` 会丢失响应性，要用 `reactive().name` |

---

## 复盘问题

- **Q: `ref<T>()` 的 `<T>` 是干嘛的？**  
  A: 这是 TypeScript 泛型，告诉编译器 ref 内部的数据类型。不写的话，TS 会根据初始值自动推断；对于复杂对象，最好显式声明以确保类型安全。

- **Q: reactive 和 ref 怎么选？**  
  A: 基本类型用 ref，对象/数组用 reactive。如果对象很大且不需要深度响应式，可以用 shallowRef 提升性能。

- **Q: shallowRef 和 ref 性能差在哪？**  
  A: ref 会对对象做深度响应式处理（递归转换为 proxy），大对象会有性能开销。shallowRef 只做浅层处理，只追踪引用本身，不追踪内部属性变化。

- **Q: readonly 的作用是什么？**  
  A: 创建只读代理，防止外部修改。常用于组件间传递数据时保护源数据不被意外更改。

---

## 学习笔记

> **`ref<T>()`** — 泛型就是类型契约。基础类型 TS 能自动推断，但复杂对象最好显式声明 `<User>`，这样 IDE 才能给你完整的类型提示。

> **`reactive()`** — 对象响应式首选。TS 会自动推断类型，也可以写 `<Product>` 更明确。注意不要解构 reactive 对象，否则会丢失响应性。

> **`shallowRef` vs `ref`** — ref 是深度响应式，shallowRef 是浅层响应式。大对象用 shallowRef 性能更好，但修改内部属性不会触发更新，需要整体替换。

> **`readonly()`** — 创建只读代理，防止外部修改。常用于组件间传递数据时保护源数据。

---

## 费曼复述

> Session 6 学了四个响应式工具的 TypeScript 类型行为：

> 1. **ref<T>()** — 泛型手动指定类型。基础类型 TS 自动推断，复杂对象要写 `<User>` 等泛型。

> 2. **reactive()** — 对象/数组类型推导。TS 根据传入对象自动推断，也可以写 `<Product>` 更明确。

> 3. **shallowRef** — 浅层响应式，只追踪引用。大对象性能更好，但修改内部属性不会触发更新，需要整体替换。

> 4. **readonly()** — 只读代理，防止外部修改。保护数据不被意外更改。

> 选择策略：**基本类型用 ref，对象用 reactive，大对象用 shallowRef，需要保护用 readonly。**
