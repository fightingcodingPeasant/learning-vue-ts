<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

// ===== 倒计时组件（演示 onMounted / onUnmounted）=====
let seconds = ref(0)
let timerId: ReturnType<typeof setInterval> | null = null

function startCountdown() {
  if (timerId !== null) return // 防止重复启动
  timerId = setInterval(() => {
    seconds.value++
  }, 1000)
}

function stopCountdown() {
  if (timerId !== null) {
    clearInterval(timerId)
    timerId = null
  }
}

// 组件挂载时自动开始倒计时
onMounted(() => {
  console.log('✅ 组件已挂载，开始倒计时')
  startCountdown()
})

// 组件卸载前清理定时器，防止内存泄漏
onUnmounted(() => {
  console.log('👋 组件即将卸载，清理定时器')
  stopCountdown()
})

// ===== 防抖搜索（演示 watch + setTimeout）=====
let searchQuery = ref('')
let lastSearched = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (newVal) => {
  // 每次输入先清除上一次的定时器
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer)
  }
  // 延迟 500ms 再"发送请求"
  debounceTimer = setTimeout(() => {
    if (newVal.trim()) {
      lastSearched.value = newVal
      console.log(`🔍 发送搜索请求: "${newVal}"`)
    } else {
      lastSearched.value = ''
      console.log('🔍 搜索词为空，不发送请求')
    }
  }, 500)
})
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">⏱️ 生命周期 + 防抖搜索</h3>

    <!-- 倒计时 -->
    <section style="margin-bottom: 16px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">倒计时（onMounted 自动启动）</h4>
      <p>已运行：<strong>{{ seconds }} 秒</strong></p>
      <p style="color: #888; font-size: 13px;">
        💡 打开控制台看 onMounted / onUnmounted 的日志<br/>
        试着刷新页面，观察卸载时的清理日志
      </p>
    </section>

    <!-- 防抖搜索 -->
    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">防抖搜索（500ms 延迟）</h4>
      <input v-model="searchQuery" placeholder="输入关键词搜索..."
             style="padding: 8px; width: 300px; font-size: 16px;" />
      <p v-if="lastSearched" style="color: green; margin-top: 8px;">
        ✅ 最后搜索：<strong>{{ lastSearched }}</strong>
      </p>
      <p v-else style="color: #888; margin-top: 8px;">
        等待输入...（快速打字不会触发，停 500ms 后才发送）
      </p>
      <p style="color: #888; font-size: 13px;">
        💡 快速输入 "hello world" 看控制台 —— 只会输出一次 "hello world"
      </p>
    </section>
  </div>
</template>
