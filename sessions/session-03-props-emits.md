# Session 3: Props/Emits 类型安全 — 父子组件通信都有类型保护

**日期：** 2026-07-15  
**目标：** 父子组件通信都有类型保护  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. `defineProps<{ ... }>()` — 接收父组件传的值

```vue
<!-- Child.vue -->
<script setup lang="ts">
interface User {
  name: string
  age: number
}

// 泛型声明 prop 类型
const props = defineProps<{
  user: User
  showAge?: boolean  // ? = 可选
}>()

console.log(props.user.name)
</script>
```

**关键：** `<{ ... }>` 是 TypeScript 泛型，告诉 TS prop 有哪些字段、什么类型。省略后变成 `any`，失去类型保护。

---

### 2. `withDefaults` — 给可选 prop 设默认值

```vue
<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0  // 默认值
})
</script>
```

**什么时候需要：** 可选 prop（有 `?`）且你想给它一个初始值。不需要默认值的 prop 不用写。

---

### 3. `defineEmits<...>()` — 向父组件事件传值

```vue
<!-- Child.vue -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
}>()

function handleClick() {
  emit('update', 42)   // TS 会检查参数类型
  emit('delete', 'abc')
}
</script>
```

**写法拆解：** `(e: '事件名', 参数: 类型): void` — 每个事件签名定义事件名和它携带的参数类型。

---

### 4. 父组件使用

```vue
<!-- Parent.vue -->
<template>
  <Child 
    :user="{ name: '小明', age: 18 }" 
    @update="(val: number) => console.log(val)"
    @delete="handleDelete"
  />
</template>
```

---

## 三种响应式工具速查

| 工具 | 用法 | 适合场景 |
|------|------|---------|
| `ref()` | `let x = ref(0)` | 基本类型（数字、字符串） |
| `reactive()` | `let obj = reactive({})` | 对象/数组 |
| `computed()` | `let y = computed(() => x.value * 2)` | 由其他值计算出来的新值 |

---

## 完整示例

### Q1: UserProfile 组件（defineProps）

```vue
<script setup lang="ts">
import { computed } from 'vue'

interface User {
  name: string
  email: string
  age: number
}

const props = defineProps<{ user: User }>()
let isAdult = computed(() => props.user.age >= 18)
</script>

<template>
  <div>
    <p>姓名：{{ props.user.name }}</p>
    <p>邮箱：{{ props.user.email }}</p>
    <p>年龄：{{ props.user.age }} 岁</p>
    <span>{{ isAdult ? '成年人' : '未成年人' }}</span>
  </div>
</template>
```

### Q2: Button 组件（withDefaults）

```vue
<script setup lang="ts">
import { withDefaults, computed } from 'vue'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary', size: 'medium', disabled: false, loading: false,
})

const btnStyle = computed(() => ({ /* 根据 props 计算样式 */ }))
</script>

<template>
  <button :disabled="props.disabled" :style="btnStyle">
    <slot v-if="!props.loading" />
    <span v-else>加载中...</span>
  </button>
</template>
```

### Q3: TodoItem + TodoList（defineEmits 完整数据流）

```vue
<!-- TodoItem.vue — 子组件 -->
<script setup lang="ts">
interface Todo {
  id: string
  text: string
  done: boolean
}

defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  toggle: () => void
  remove: (id: string) => void
}>()
</script>

<template>
  <div>
    <span @click="emit('toggle')">{{ todo.text }}</span>
    <button @click="emit('remove', todo.id)">删除</button>
  </div>
</template>
```

```vue
<!-- TodoList.vue — 父组件 -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoItem from './TodoItem.vue'

const todos = ref<Todo[]>([/* ... */])

function handleToggle(id: string) { /* 切换完成 */ }
function handleRemove(id: string) { /* 删除 todo */ }
</script>

<template>
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @toggle="handleToggle(todo.id)"
    @remove="handleRemove(todo.id)"
  />
</template>
```

---

## 常见错误

| 错误 | 说明 |
|------|------|
| `defineProps()` 不加泛型 | 变成 `any`，失去类型保护 |
| 模板里写 `props.user.name` | 模板中直接写 `user.name`，不需要 `props.` |
| 用 `props` 解构丢失响应性 | `const { user } = defineProps(...)` ❌ |
| emits 写成字符串数组 | 旧写法 `emits: ['update']` 没有类型检查 |
| 忘记导入 `computed` | `computed is not defined` → 运行时白屏 |
| 模板变量与 props 变量名不匹配 | `const props = defineProps` 时模板要用 `props.xxx` |

---

## 复盘问题

- **Q: `defineProps<{ ... }>()` 后面那个 `<{ ... }>` 是干嘛的？**  
  A: 这是 TypeScript 泛型语法，告诉编译器 prop 有哪些字段、什么类型。省略后变成 `any`，IDE 不会做类型检查。

- **Q: `withDefaults` 什么时候需要用到？**  
  A: 当 prop 是可选的（有 `?`）且你想给它一个默认值时。如果所有 prop 都是必须的，或者可选 prop 不需要默认值，就不用。

- **Q: `defineEmits` 的泛型写法是什么意思？**  
  A: `(e: '事件名', 参数: 类型): void` — `e` 指定事件名，后面的参数是触发事件时传递的数据，`: void` 表示没有返回值。这样子组件调用 `emit('xxx', data)` 时 TS 会检查数据类型是否正确。

- **Q: 模板里访问 prop 为什么要直接写名字，不能用 `props.xxx`？**  
  A: 在 `<script setup>` 中，`defineProps` 返回的对象在模板里会自动暴露为顶层变量。但如果你用了 `const props = defineProps<...>()` 显式赋值，那模板里访问时需要通过 `props.xxx` 来引用。

---

## 学习笔记

> **`defineProps<{ ... }>()`** — 泛型声明就是类型契约。父组件传错类型 IDE 直接标红，比运行时才发现错误强太多。
>
> **`withDefaults`** — 给可选 prop 设默认值，和 `defineProps` 配合使用。注意 `withDefaults` 的第二个参数是默认值对象，不是 prop 里的 `default` 属性。
>
> **`defineEmits` 泛型写法** — `(e: '事件名', 参数: 类型): void`，每个事件一行签名。子组件调 `emit('update', 42)` 时 TS 会检查 42 是不是 number 类型。
>
> **父子数据流** — 父传 prop（↓），子发事件（↑）。全链路类型安全，从父组件传值到子组件发事件，每一步都有 TS 保护。
>
> **踩坑记录** — `computed` 必须从 vue 导入，否则运行时 `computed is not defined` 导致整个 app 白屏。模板里如果用 `const props = defineProps()` 定义的变量，访问时必须加 `props.` 前缀。

---

## 费曼复述

> Session 3 学了父子组件通信的类型安全，核心就三件事：
>
> 1. **defineProps** — 父→子传值。用泛型声明 prop 类型，`<script setup>` 里 `const props = defineProps<{ user: User }>()`，模板里通过 `props.user.name` 访问。可选 prop 用 `withDefaults` 设默认值。
> 2. **defineEmits** — 子→父传事件。用泛型定义事件签名 `(e: '事件名', 参数: 类型): void`，子组件 `emit('update', 42)` 时 TS 自动检查类型。
> 3. **完整数据流闭环** — 父组件传 prop 给子组件 ↓，子组件通过 emit 向上发事件 ↑，父组件监听事件并更新数据。整个过程都有类型保护。
>
> 三个练习串起来：UserProfile（只收 prop）→ Button（prop + 默认值 + slot）→ TodoItem/TodoList（prop + emit 双向通信），覆盖了父子组件通信的所有模式。
