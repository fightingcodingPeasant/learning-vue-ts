# Session 2: Vue 3 组件基础 — 组合式 API

**日期：** 2026-07-13  
**目标：** 写出第一个能跑的 Vue 组件  
**状态：** ⏳ 进行中

---

## 核心知识点

### 1. `<script setup>` — 组合式 API 入口

```vue
<script setup>
// 在这里写所有逻辑：变量、函数、计算属性
</script>
```

Vue 3 的新写法，比 Options API 更自由灵活。

---

### 2. `ref()` — 响应式变量

```typescript
import { ref } from 'vue'
let count = ref(0)
```

**关键概念：** ref 让数据变成"活"的，修改时页面自动更新。

⚠️ **代码里访问要加 `.value`，模板里不用加：**
```typescript
count.value++      // ✅ 代码里
```
```html
<p>{{ count }}</p>  <!-- ✅ 模板里 -->
```

---

### 3. `computed()` — 计算属性

```typescript
import { computed } from 'vue'
let message = computed(() => {
  if (count.value === 0) return '空空如也'
  return `当前是 ${count.value}`
})
```

**自动更新：** 依赖变了就重新计算，不需要手动调用。

**vs function：**
| | computed | function |
|--|----------|----------|
| 缓存 | 依赖不变不重算 | 每次调用都执行 |
| 用法 | 纯计算 | 有副作用（发请求等） |

---

### 4. 事件绑定

```html
<button @click="add">+</button>
```

`@click` 等价于 `v-on:click`，点击时调用函数。

---

### 5. 模板插值

```html
<p>当前计数：{{ count }}</p>
```

双花括号把 JS 变量的值塞到 HTML 里。

---

## 三种响应式工具速查

| 工具 | 用法 | 适合场景 |
|------|------|---------|
| `ref()` | `let x = ref(0)` | 基本类型（数字、字符串） |
| `reactive()` | `let obj = reactive({})` | 对象/数组 |
| `computed()` | `let y = computed(() => x.value * 2)` | 由其他值计算出来的新值 |

---

## 完整示例：计数器

```vue
<script setup>
import { ref, computed } from 'vue'

let count = ref(0)

function add() {
  count.value++
}

function minus() {
  count.value--
}

function reset() {
  count.value = 0
}

let message = computed(() => {
  if (count.value === 0) return '空空如也'
  if (count.value > 10) return '太多了！'
  return `当前是 ${count.value}`
})
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>当前计数：{{ count }}</p>
    <button @click="minus">-</button>
    <button @click="add">+</button>
    <button @click="reset">重置</button>
  </div>
</template>
```

---

## 练习题

### 练习 1：计数器组件
实现一个计数器，包含 +1、-1、重置三个按钮。

### 练习 2：输入框 + 字数显示
做一个输入框，下方实时显示"你输入了 X 个字"。

### 练习 3：字数超限提示
在练习 2 的基础上，超过 10 个字时显示"太长了"。

---

## 复盘问题

- [ ] ref 和普通变量的区别是什么？
- [ ] computed 和 method 什么时候用哪个？

---

## 学习笔记

> 记录你的理解和疑问：


## 费曼复述

> 用自己的话总结今天学到的内容：
