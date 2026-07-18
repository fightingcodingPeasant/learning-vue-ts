<script setup lang="ts">
import { ref, watchEffect } from 'vue'

let count = ref(0)
let multiplier = ref(1)

// watchEffect 自动追踪回调里用到的所有响应式变量
// count 或 multiplier 任一变化，都会重新执行
watchEffect(() => {
  const result = count.value * multiplier.value
  console.log(`watchEffect 触发: ${count.value} × ${multiplier.value} = ${result}`)
})

function addCount() { count.value++ }
function multChange() { multiplier.value = Math.floor(Math.random() * 5) + 1 }
function reset() { count.value = 0; multiplier.value = 1 }
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 400px; background: #fafafa;">
    <h3 style="margin-top: 0;">⚡ watchEffect 自动追踪器</h3>
    <p>count = <strong>{{ count }}</strong> &nbsp;|&nbsp; multiplier = <strong>{{ multiplier }}</strong></p>

    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <button @click="addCount" style="padding: 4px 16px; cursor: pointer;">+ count</button>
      <button @click="multChange" style="padding: 4px 16px; cursor: pointer;">随机 multiplier</button>
      <button @click="reset" style="padding: 4px 16px; cursor: pointer;">重置</button>
    </div>

    <hr style="border: none; border-top: 1px solid #eee;" />

    <!-- 对比：computed 也能做同样计算 -->
    <p style="color: #666; font-size: 14px;">
      💡 这个计算也可以用 computed 做：<br/>
      <code>{{ count * multiplier }}</code>
    </p>
    <p style="color: #888; font-size: 13px;">
      👀 打开控制台看 watchEffect 的输出
    </p>
  </div>
</template>
