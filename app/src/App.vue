<script setup lang="ts">
import { ref, computed } from 'vue'

// ===== 计数器部分 =====
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

// ===== 输入框 + 字数统计 =====
let text = ref('')

let charCount = computed(() => text.value.length)

let hint = computed(() => {
  if (charCount.value === 0) return ''
  if (charCount.value > 10) return '太长了！'
  return `${charCount.value}/10`
})
</script>

<template>
  <div style="padding: 20px;">
    <!-- 计数器 -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔢 计数器</h2>
      <p>{{ message }} — 计数：{{ count }}</p>
      <button @click="minus">-</button>
      <button @click="add">+</button>
      <button @click="reset">重置</button>
    </section>

    <!-- 输入框 -->
    <section style="border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>✏️ 字数统计</h2>
      <input v-model="text" placeholder="在这里输入文字..."
             style="padding: 8px; width: 300px; font-size: 16px;" />
      <p>你输入了 {{ charCount }} 个字</p>
      <p v-if="hint" :style="{ color: hint === '太长了！' ? 'red' : 'green' }">
        {{ hint }}
      </p>
    </section>
  </div>
</template>
