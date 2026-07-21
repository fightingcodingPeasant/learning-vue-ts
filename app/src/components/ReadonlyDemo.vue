<script setup lang="ts">
import { ref, readonly } from 'vue'

// ===== Q4: readonly() — 只读状态 =====

let count = ref(0)

// readonly 创建一个只读的代理对象，不能修改
let readonlyCount = readonly(count)

function increment() {
  // count.value++ // ❌ TS 会报错：Cannot assign to 'value' because it is a read-only property
  count.value++ // ✅ 原始 ref 可以修改
}

// ⚠️ 注意：readonlyCount.value++ 会编译错误！
// readonly 创建的代理对象不能直接修改
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 400px; background: #fafafa;">
    <h3 style="margin-top: 0;">🔒 readonly() 只读状态</h3>

    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <p>计数：<strong>{{ readonlyCount }}</strong></p>
      <button @click="increment" style="padding: 4px 16px; cursor: pointer;">+1（只能改原始 ref）</button>
      <p style="color: #888; font-size: 13px;">
        💡 readonly 创建的代理不能修改，常用于保护数据不被意外更改<br/>
        比如：组件 A 把数据传给组件 B，用 readonly 防止 B 修改 A 的数据
      </p>
    </section>
  </div>
</template>
