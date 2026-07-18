<script setup lang="ts">
import { ref, watch } from 'vue'

let count = ref(0)

// watch 监听 count 变化：旧值 → 新值
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变成了 ${newVal}`)
})

function add() { count.value++ }
function minus() { count.value-- }
function reset() { count.value = 0 }
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 360px; background: #fafafa;">
    <h3 style="margin-top: 0;">🔢 Watch 计数器</h3>
    <p>当前计数：<strong>{{ count }}</strong></p>
    <div style="display: flex; gap: 8px;">
      <button @click="minus" style="padding: 4px 16px; cursor: pointer;">-</button>
      <button @click="add" style="padding: 4px 16px; cursor: pointer;">+</button>
      <button @click="reset" style="padding: 4px 16px; cursor: pointer;">重置</button>
    </div>
  </div>
</template>
