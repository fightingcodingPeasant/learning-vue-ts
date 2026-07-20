<script setup lang="ts">
import { computed } from 'vue'
import { useCounter } from '../composables/useCounter'

// ===== 使用 Composable 的计数器 =====
const { count, add, minus, reset } = useCounter(10)

let message = computed(() => {
  if (count.value === 0) return '空空如也'
  if (count.value > 20) return '太多了！'
  return `当前是 ${count.value}`
})
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 360px; background: #fafafa;">
    <h3 style="margin-top: 0;">🔢 Composable 计数器（Session 5）</h3>
    <p>{{ message }} — 计数：<strong>{{ count }}</strong></p>
    <div style="display: flex; gap: 8px;">
      <button @click="() => minus()" style="padding: 4px 16px; cursor: pointer;">-</button>
      <button @click="() => add()" style="padding: 4px 16px; cursor: pointer;">+</button>
      <button @click="() => reset()" style="padding: 4px 16px; cursor: pointer;">重置</button>
    </div>
    <p style="color: #888; font-size: 13px;">
      💡 这个计数器逻辑来自 useCounter composable，组件本身只负责展示
    </p>
  </div>
</template>
