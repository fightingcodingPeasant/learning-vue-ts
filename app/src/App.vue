<script setup lang="ts">
import { ref, computed } from 'vue'
import UserProfile from './components/UserProfile.vue'
import Button from './components/Button.vue'
import TodoList from './components/TodoList.vue'

// ===== 计数器部分 =====
let count = ref(0)

function add() { count.value++ }
function minus() { count.value-- }
function reset() { count.value = 0 }

let message = computed(() => {
  if (count.value === 0) return '空空如也'
  if (count.value > 10) return '太多了！'
  return `当前是 ${count.value}`
})

// ===== 输入框 + 字数统计 =====
let text = ref('')
let charCount = computed(() => text.value.length)

let hint = computed(() => {
  if (charCount.value === 0) return ''
  if (charCount.value > 10) return '太长了！'
  return `${charCount.value}/10`
})

// ===== Session 3 数据 =====
const demoUser = ref({
  name: '小明',
  email: 'xiaoming@example.com',
  age: 18,
})
</script>

<template>
  <div style="padding: 20px; max-width: 700px; margin: 0 auto;">
    <!-- 计数器 -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔢 计数器（Session 2）</h2>
      <p>{{ message }} — 计数：{{ count }}</p>
      <button @click="minus">-</button>
      <button @click="add">+</button>
      <button @click="reset">重置</button>
    </section>

    <!-- 输入框 -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>✏️ 字数统计（Session 2）</h2>
      <input v-model="text" placeholder="在这里输入文字..."
             style="padding: 8px; width: 300px; font-size: 16px;" />
      <p>你输入了 {{ charCount }} 个字</p>
      <p v-if="hint" :style="{ color: hint === '太长了！' ? 'red' : 'green' }">
        {{ hint }}
      </p>
    </section>

    <!-- Q1: UserProfile -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>👤 Q1: UserProfile（defineProps）</h2>
      <UserProfile :user="demoUser" />
    </section>

    <!-- Q2: Button -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔘 Q2: Button（withDefaults）</h2>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button size="small">小号</Button>
        <Button size="large">大号</Button>
        <Button disabled>禁用状态</Button>
        <Button loading>加载中...</Button>
      </div>
    </section>

    <!-- Q3: TodoList -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>📝 Q3: TodoList（defineEmits）</h2>
      <TodoList />
    </section>
  </div>
</template>
