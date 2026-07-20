# Session 5: Composable 逻辑复用 — 把重复逻辑抽成函数

**日期：** 2026-07-18  
**目标：** 掌握 Composable 写法，把可复用逻辑抽成 `useXxx()` 函数  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. 什么是 Composable？

Composable（组合式函数）是一个以 `use` 开头的函数，内部使用 Vue 的响应式 API（ref、computed、watch），返回可以在多个组件中复用的数据和函数。

```typescript
// composables/useCounter.ts
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  let count = ref(initialValue)

  function add(n = 1) { count.value += n }
  function minus(n = 1) { count.value -= n }
  function reset() { count.value = initialValue }

  return { count, add, minus, reset }
}
```

**为什么叫 useXxx？** 这是 Vue 社区的命名约定，一看就知道是组合式函数。

---

### 2. 为什么要用 Composable？

**问题：** 同样的逻辑在多个组件里重复写。

```vue
<!-- 组件A -->
<script setup>
let count = ref(0)
function add() { count.value++ }
</script>

<!-- 组件B -->
<script setup>
let count = ref(0)
function add() { count.value++ }
</script>
```

**解决：** 抽成 Composable，哪里需要哪里导入。

```typescript
// 组件A
import { useCounter } from './composables/useCounter'
const { count, add } = useCounter()

// 组件B
import { useCounter } from './composables/useCounter'
const { count, add } = useCounter()
```

---

### 3. Composable vs 组件

| | Composable | 组件 |
|--|------------|------|
| 有模板吗？ | ❌ 没有 | ✅ 有 |
| 能复用吗？ | ✅ 纯逻辑复用 | ✅ UI + 逻辑复用 |
| 什么时候用？ | 多个组件需要相同逻辑 | 需要展示给用户看的内容 |

**记忆口诀：** 要展示用组件，要逻辑复用用 Composable。

---

### 4. useLocalStorage — 自动同步到 localStorage

```typescript
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  let value = stored ? JSON.parse(stored) : defaultValue

  const data = ref(value as T)

  // 每次数据变化时同步到 localStorage
  watch(data, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  function reset() {
    data.value = defaultValue
  }

  return { data, reset }
}
```

**关键：** `{ deep: true }` 表示深度监听，对象/数组内部属性变了也会触发保存。

---

## 完整示例代码

### useCounter.ts

```typescript
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  let count = ref(initialValue)

  function add(n = 1) { count.value += n }
  function minus(n = 1) { count.value -= n }
  function reset() { count.value = initialValue }

  return { count, add, minus, reset }
}
```

### useLocalStorage.ts

```typescript
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  let value = stored ? JSON.parse(stored) : defaultValue

  const data = ref(value as T)

  watch(data, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  function reset() {
    data.value = defaultValue
  }

  return { data, reset }
}
```

### ComposableCounterDemo.vue

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useCounter } from '../composables/useCounter'

const { count, add, minus, reset } = useCounter(10)

let message = computed(() => {
  if (count.value === 0) return '空空如也'
  if (count.value > 20) return '太多了！'
  return `当前是 ${count.value}`
})
</script>

<template>
  <div>
    <p>计数：<strong>{{ count }}</strong></p>
    <button @click="minus">-</button>
    <button @click="add">+</button>
    <button @click="reset">重置</button>
  </div>
</template>
```

### TodoListWithStorage.vue

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'

interface Todo {
  id: string
  text: string
  done: boolean
}

const { data: todos, reset } = useLocalStorage<Todo[]>('session5-todos', [
  { id: '1', text: '学 Composable 逻辑复用', done: true },
])

let filter = ref<'all' | 'done' | 'undone'>('all')

let filteredTodos = computed(() => {
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  if (filter.value === 'undone') return todos.value.filter((t) => !t.done)
  return todos.value
})
</script>

<template>
  <div>
    <!-- 列表渲染 -->
  </div>
</template>
```

---

## 常见错误

| 错误 | 说明 |
|------|------|
| Composable 返回普通变量 | 必须返回 ref/reactive，否则失去响应性 |
| 忘记导入 Composable | `useCounter is not defined` → 运行时白屏 |
| Composable 里用了非响应式变量 | watchEffect 只追踪 ref/reactive |
| localStorage 存储复杂对象没序列化 | `JSON.stringify` / `JSON.parse` 必须配对使用 |

---

## 复盘问题

- **Q: Composable 和组件的区别？**  
  A: Composable 是纯逻辑，没有模板；组件有模板 + 逻辑。Composable 可以被多个组件复用。

- **Q: 为什么叫 useXxx？**  
  A: 这是 Vue 社区的命名约定，一看就知道是组合式函数。

- **Q: Composable 里能用生命周期钩子吗？**  
  A: 可以！比如 `onMounted`、`watch` 都能用，但只能在 setup 阶段调用。

- **Q: 返回普通变量还是 ref？**  
  A: 必须返回 ref/reactive，否则组件里修改后页面不会更新。

---

## 学习笔记

> **Composable 就是"可复用的逻辑包"** —— 把多个组件都需要的功能抽成一个函数，返回 ref 和函数，谁用谁导入。

> **命名规范：useXxx** —— 一看就知道是组合式函数，这是 Vue 社区约定。

> **localStorage 持久化 = 实用技巧** —— 用 watch 监听数据变化，自动保存到 localStorage。刷新页面后数据还在，用户体验更好。

> **deep: true = 深度监听** —— 对象/数组内部属性变了也会触发回调，适合复杂数据结构。

---

## 费曼复述

> Session 5 学了 Composable（组合式函数）：

> 1. **什么是 Composable？** —— 一个以 `use` 开头的函数，内部使用 Vue 的响应式 API，返回可以在多个组件中复用的数据和函数。

> 2. **为什么要用？** —— 避免重复代码。如果两个组件都需要计数器逻辑，与其写两遍，不如抽成 `useCounter()`，哪里需要哪里导入。

> 3. **实战练习：**
>    - `useCounter()` — 计数器逻辑复用
>    - `useLocalStorage()` — 自动同步数据到 localStorage
>    - `TodoListWithStorage.vue` — 刷新页面后数据还在的 Todo 列表

> 记住口诀：**要展示用组件，要逻辑复用用 Composable**。
