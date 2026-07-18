<script setup lang="ts">
import { ref, watch } from 'vue'

let text = ref('')
let isTooLong = ref(false)

// watch 监听 text 变化
watch(text, (newVal, oldVal) => {
  console.log(`text 从 "${oldVal}" 变成了 "${newVal}"`)
  // 超过 10 个字就标记为 true
  isTooLong.value = newVal.length > 10
})
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 400px; background: #fafafa;">
    <h3 style="margin-top: 0;">✏️ Watch 文本监控器</h3>
    <input v-model="text" placeholder="在这里输入文字..."
           style="padding: 8px; width: 300px; font-size: 16px;" />
    <p>当前字数：<strong>{{ text.length }}</strong></p>
    <p :style="{ color: isTooLong ? 'red' : 'green', fontWeight: 'bold' }">
      {{ isTooLong ? '太长了！' : '长度合适~' }}
    </p>
  </div>
</template>
