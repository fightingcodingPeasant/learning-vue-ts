# Session 9: 表单验证 + 自定义指令 — 处理复杂表单和自定义指令

**日期：** 2026-07-23  
**目标：** 掌握表单验证逻辑 + 自定义指令的创建和使用  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. 表单验证

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface FormErrors {
  username?: string
  email?: string
  password?: string
}

const username = ref('')
const errors = ref<FormErrors>({})

function validateEmail(): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.value.email = '邮箱不能为空'
    return false
  }
  if (!emailRegex.test(email.value)) {
    errors.value.email = '请输入有效的邮箱地址'
    return false
  }
  delete errors.value.email
  return true
}

function handleSubmit() {
  const valid = [validateUsername(), validateEmail(), ...].every(Boolean)
  if (valid) {
    // 提交表单
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="username" @blur="validateUsername" @input="clearError('username')" />
    <p v-if="errors.username" style="color: red;">{{ errors.username }}</p>
  </form>
</template>
```

**验证策略：**
- `@blur` 失去焦点时验证（给用户反馈）
- `@input` 输入时清除错误（减少焦虑）
- `@submit` 提交时全面检查（最终把关）

---

### 2. 自定义指令

```vue
<script setup lang="ts">
// ===== v-focus：自动聚焦 =====
const vFocus = {
  mounted: (el: HTMLElement) => {
    el.focus()
  },
}

// ===== v-highlight：高亮背景 =====
const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  },
}

// ===== v-time：显示时间 =====
const vTime = {
  mounted: (el) => {
    el.textContent = new Date().toLocaleTimeString()
  },
}
</script>

<template>
  <input v-focus placeholder="自动聚焦" />
  <p v-highlight="'yellow'">黄色高亮</p>
  <p v-time></p>
</template>
```

**自定义指令生命周期钩子：**
| 钩子 | 触发时机 | 常见用途 |
|------|---------|---------|
| `mounted` | 元素插入 DOM 后 | 设置初始样式、聚焦、绑定事件 |
| `updated` | 组件 VNode 更新后 | 响应式更新样式 |
| `unmounted` | 元素从 DOM 移除前 | 清理事件监听、定时器 |

**钩子参数：**
- `el` — 绑定的 DOM 元素
- `binding` — 包含 `{ value, oldValue, arg, modifiers }` 的对象

---

## 完整示例代码

### RegisterForm.vue — 表单验证

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref<FormErrors>({})

function validateEmail(): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) { errors.value.email = '邮箱不能为空'; return false }
  if (!emailRegex.test(email.value)) { errors.value.email = '邮箱格式不正确'; return false }
  delete errors.value.email
  return true
}

function handleSubmit() {
  const valid = [validateUsername(), validateEmail(), validatePassword(), validateConfirm()].every(Boolean)
  if (valid) alert('注册成功！')
}
</script>
```

### CustomDirectiveDemo.vue — 自定义指令

```vue
<script setup lang="ts">
// v-focus
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

// v-highlight
const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  },
}

// v-time
const vTime = {
  mounted: (el) => { el.textContent = new Date().toLocaleTimeString() },
}
</script>

<template>
  <input v-focus />
  <p v-highlight="'#ffe0e6'">粉色高亮</p>
  <p v-time></p>
</template>
```

---

## 常见错误

| 错误 | 说明 |
|------|------|
| 忘记 `@submit.prevent` | 表单会刷新页面，阻止默认行为 |
| 指令钩子写成箭头函数 | 箭头函数没有 this，但 Composition API 写法不需要 this |
| 自定义指令没有 return | 在 `<script setup>` 中定义的指令需要手动注册或全局注册 |
| 验证规则太严格 | 用户体验差，应该逐步提示而非一次性报错 |

---

## 复盘问题

- **Q: 为什么用 @blur 而不是 @change？**  
  A: @change 在失去焦点且值改变时触发，@blur 只要失去焦点就触发。用 @blur 可以更早发现错误。

- **Q: 自定义指令和 composables 有什么区别？**  
  A: Composable 操作的是数据（ref/reactive），指令操作的是 DOM（el.focus()）。想控制数据用 Composable，想操作 DOM 用指令。

- **Q: binding.value 是什么类型？**  
  A: 取决于传了什么。`v-highlight` 传字符串就是 string，`v-highlight="color"` 传变量就是变量类型。

---

## 学习笔记

> **表单验证** = 三层防线：失去焦点时验证（即时反馈）、输入时清除错误（友好体验）、提交时全面检查（最终把关）。

> **自定义指令** = 操作 DOM 的利器。mounted 钩子用于初始化（聚焦、绑定事件），updated 用于响应式更新，unmounted 用于清理。

> **选择策略：** 控制数据流用 Composable，直接操作 DOM 用指令。

---

## 费曼复述

> Session 9 学了两个主题：

> 1. **表单验证** — 用 ref 存数据和错误信息，@blur 触发验证，@input 清除错误，@submit 全面检查。核心是给用户友好的反馈：输入时不报错，提交时才显示所有错误。

> 2. **自定义指令** — 操作 DOM 的方式。`v-focus` 让输入框自动聚焦，`v-highlight` 动态改变背景色，`v-time` 显示当前时间。每个指令有 mounted/updated/unmounted 三个钩子。

> 选择策略：**控制数据用 Composable，操作 DOM 用指令。**
