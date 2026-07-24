<script setup lang="ts">
import { ref } from 'vue'

// ===== 自定义指令：v-focus（自动聚焦）=====
const vFocus = {
  mounted: (el: HTMLElement) => {
    el.focus()
  },
}

// ===== 自定义指令：v-highlight（高亮）=====
const vHighlight = {
  mounted: (el: HTMLElement, binding: { value: string }) => {
    const color = binding.value || 'yellow'
    el.style.backgroundColor = color
  },
  updated: (el: HTMLElement, binding: { value: string }) => {
    const color = binding.value || 'yellow'
    el.style.backgroundColor = color
  },
}

// ===== 自定义指令：v-time（显示时间）=====
const vTime = {
  mounted: (el: HTMLElement) => {
    el.textContent = new Date().toLocaleTimeString()
  },
}

let highlightColor = ref('yellow')
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">🎨 自定义指令（Session 9）</h3>

    <!-- v-focus -->
    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">v-focus — 自动聚焦</h4>
      <input v-focus placeholder="这个输入框会自动聚焦" style="padding: 8px; width: 300px;" />
      <p style="color: #888; font-size: 13px;">💡 刷新页面后，这个输入框会自动获得焦点</p>
    </section>

    <!-- v-highlight -->
    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">v-highlight — 背景高亮</h4>
      <p v-highlight="highlightColor" style="padding: 8px; margin: 8px 0;">这段文字有背景色</p>
      <div style="display: flex; gap: 8px;">
        <button @click="highlightColor = 'yellow'" style="padding: 4px 12px; cursor: pointer; background: yellow; border: 1px solid #ccc;">黄色</button>
        <button @click="highlightColor = '#c6e0ff'" style="padding: 4px 12px; cursor: pointer; background: #c6e0ff; border: 1px solid #ccc;">蓝色</button>
        <button @click="highlightColor = '#ffe0e6'" style="padding: 4px 12px; cursor: pointer; background: #ffe0e6; border: 1px solid #ccc;">粉色</button>
        <button @click="highlightColor = ''" style="padding: 4px 12px; cursor: pointer;">清除</button>
      </div>
      <p style="color: #888; font-size: 13px;">💡 点击按钮切换颜色，v-highlight 的 updated 钩子会更新样式</p>
    </section>

    <!-- v-time -->
    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">v-time — 显示当前时间</h4>
      <p v-time></p>
      <p style="color: #888; font-size: 13px;">💡 指令在挂载时执行，显示页面加载时的时间</p>
    </section>
  </div>
</template>
