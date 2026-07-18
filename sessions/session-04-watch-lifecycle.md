# Session 4: Watchers & 生命周期 — 数据变了自动触发

**日期：** 2026-07-18  
**目标：** 掌握 watch / watchEffect 响应式副作用 + 生命周期钩子  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. `watch()` — 监听指定数据变化

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

let count = ref(0)

// watch(监听源, (新值, 旧值) => { ... })
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变成了 ${newVal}`)
})
</script>
```

**关键：** `watch` 是你告诉它"监听谁"，它才监听。回调里可以写任何副作用（发请求、操作 DOM、打印日志）。

---

### 2. `watchEffect()` — 自动追踪依赖

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

let count = ref(0)
let multiplier = ref(1)

// watchEffect 自动检测回调里用到的所有响应式变量
watchEffect(() => {
  const result = count.value * multiplier.value
  console.log(`${count.value} × ${multiplier.value} = ${result}`)
})
</script>
```

**关键区别：**
| | watch | watchEffect |
|--|-------|-------------|
| 指定监听源 | 必须手动写 | 自动检测 |
| 拿到旧值 | ✅ `(newVal, oldVal)` | ❌ |
| 适合场景 | 需要旧值、精确控制 | 多个依赖同时变、懒得写 |

---

### 3. 生命周期钩子

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

let timerId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // 组件挂载到 DOM 后执行（比如发 API 请求）
  console.log('✅ 组件已挂载')
  timerId = setInterval(() => { /* ... */ }, 1000)
})

onUnmounted(() => {
  // 组件卸载前清理（防止内存泄漏！）
  console.log('👋 组件即将卸载')
  if (timerId !== null) clearInterval(timerId)
})
</script>
```

**常见钩子：**
- `onMounted` — 组件挂载后（发请求、初始化）
- `onUnmounted` — 组件卸载前（清定时器、清事件监听）
- `onUpdated` — 数据变化导致 DOM 更新后

---

### 4. 防抖搜索实战

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

let searchQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (newVal) => {
  // 每次输入先清除上一次的定时器
  if (debounceTimer !== null) clearTimeout(debounceTimer)
  
  // 延迟 500ms 再"发送请求"
  debounceTimer = setTimeout(() => {
    if (newVal.trim()) {
      console.log(`🔍 发送搜索: "${newVal}"`)
    }
  }, 500)
})
</script>
```

**为什么需要防抖？** 用户每敲一个字母就发一次请求太浪费。防抖 = 等用户停下来 500ms 后再发，只发最后一次。

---

## watch vs computed 怎么选？

| 场景 | 推荐 | 原因 |
|------|------|------|
| 根据其他值算出一个新值 | `computed` | 有缓存，性能更好 |
| 数据变了要做一件事（发请求、打印） | `watch` | 这是副作用，不是计算 |
| 多个依赖同时变，懒得写监听源 | `watchEffect` | 自动追踪 |

**记忆口诀：** 要值用 computed，做事用 watch。

---

## 完整示例代码

### WatchDemo.vue — watch 监听数字

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

let count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变成了 ${newVal}`)
})

function add() { count.value++ }
function minus() { count.value-- }
</script>

<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="minus">-</button>
    <button @click="add">+</button>
  </div>
</template>
```

### TextWatchDemo.vue — watch 监听字符串

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

let text = ref('')
let isTooLong = ref(false)

watch(text, (newVal) => {
  isTooLong.value = newVal.length > 10
})
</script>

<template>
  <div>
    <input v-model="text" placeholder="在这里输入..." />
    <p :style="{ color: isTooLong ? 'red' : 'green' }">
      {{ isTooLong ? '太长了！' : '长度合适~' }}
    </p>
  </div>
</template>
```

### WatchEffectDemo.vue — 自动追踪

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

let count = ref(0)
let multiplier = ref(1)

watchEffect(() => {
  const result = count.value * multiplier.value
  console.log(`${count.value} × ${multiplier.value} = ${result}`)
})
</script>

<template>
  <div>
    <p>{{ count }} × {{ multiplier }} = {{ count * multiplier }}</p>
  </div>
</template>
```

### LifecycleDemo.vue — 生命周期 + 防抖搜索

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

// ===== 倒计时 =====
let seconds = ref(0)
let timerId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timerId = setInterval(() => { seconds.value++ }, 1000)
})

onUnmounted(() => {
  if (timerId !== null) clearInterval(timerId)
})

// ===== 防抖搜索 =====
let searchQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (newVal) => {
  if (debounceTimer !== null) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    console.log(`🔍 搜索: "${newVal}"`)
  }, 500)
})
</script>
```

---

## 常见错误

| 错误 | 说明 |
|------|------|
| 用 watch 替代 computed | 如果只是派生值，用 computed 更简洁有缓存 |
| 忘记清理定时器/事件监听 | onUnmounted 不清理 → 内存泄漏，页面卡死 |
| watch 回调里修改监听源导致无限循环 | watch 不自动深比较，需要 `{ deep: true }` 选项 |
| watchEffect 里用了非响应式变量 | 它只追踪 ref/reactive，普通变量变了不会触发 |

---

## 复盘问题

- **Q: computed 和 watch 都能响应变化，什么时候该用哪个？**  
  A: 要"算出一个值"用 computed（有缓存），要"做一件事"用 watch（副作用）。比如根据 count 显示文字用 computed，count 变了发请求用 watch。

- **Q: watchEffect 和 watch 有什么区别？**  
  A: watch 需要你手动指定监听谁，能拿到新旧值；watchEffect 自动检测回调里用了哪些响应式变量，拿不到旧值但写法更简洁。

- **Q: 为什么搜索要用防抖而不是直接发请求？**  
  A: 用户每敲一个字母就发一次请求太浪费服务器资源。防抖 = 等用户停下来 500ms 后再发，只发最后一次。

- **Q: onUnmounted 不清理定时器会发生什么？**  
  A: 定时器还在跑，但组件已经不在页面上了。这叫内存泄漏——浏览器一直持有这个定时器的引用，无法回收内存。

---

## 学习笔记

> **watch 就像给变量装了个"监控器"** —— 每次值变了，回调函数就自动执行。第一个参数是监听源（ref 或 getter），第二个是回调 `(newVal, oldVal)`。

> **watchEffect 更懒** —— 它自动检测回调里用到了哪些响应式变量，任何一个变了就重新执行。适合多个依赖同时变、不需要旧值的场景。

> **生命周期钩子是组件的"人生阶段"** —— onMounted = 出生（初始化、发请求），onUnmounted = 死亡（清定时器、清事件监听）。不清理 = 内存泄漏。

> **防抖搜索 = 实用技巧** —— 每次输入先 clearTimeout，再 setTimeout 500ms。这样只有用户停下来的那一刻才真正"发送请求"。

---

## 费曼复述

> Session 4 学了两个核心概念：

> 1. **Watch（监听器）** —— 数据变了自动触发回调。`watch(source, callback)` 需要你指定监听谁；`watchEffect()` 更懒，自动追踪所有依赖。watch 能拿到新旧值，watchEffect 不能。记住口诀：**要值用 computed，做事用 watch**。

> 2. **生命周期钩子** —— 组件有"出生"（onMounted）和"死亡"（onUnmounted）。挂载时可以做初始化（发请求、启动定时器），卸载时必须清理（清定时器、清事件监听），否则内存泄漏。

> 综合实战是一个**防抖搜索框**：watch 监听输入框，每次输入先清除上一次的 setTimeout，再设一个新的 500ms 定时器。这样快速打字时不会频繁触发，只有停下来才发一次请求。
