<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 监听路由变化
router.afterEach(() => {
  console.log(`当前路由: ${route.path}`)
})

function navigateTo(path: string) {
  router.push(path)
}

function navigateWithParams() {
  // 带参数跳转
  router.push({ name: 'User', params: { id: '123' }, query: { tab: 'profile' } })
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">🧭 Vue Router 类型安全</h3>

    <!-- 导航到不同页面 -->
    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">导航到不同页面</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="navigateTo('/')" style="padding: 6px 16px; cursor: pointer;">首页</button>
        <button @click="navigateTo('/about')" style="padding: 6px 16px; cursor: pointer;">关于</button>
        <button @click="navigateWithParams" style="padding: 6px 16px; cursor: pointer;">用户详情</button>
      </div>
      <p style="color: #888; font-size: 13px; margin-top: 8px;">
        💡 点击按钮切换路由，观察地址栏变化<br/>
        💡 使用 router.push() 编程式导航，TS 会检查路径是否存在
      </p>
    </section>

    <!-- 路由参数 -->
    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">路由参数</h4>
      <p>当前路径：<code>{{ route.path }}</code></p>
      <p v-if="route.params.id">用户 ID：<strong>{{ route.params.id }}</strong></p>
      <p v-if="route.query.tab">标签页：<strong>{{ route.query.tab }}</strong></p>
      <p v-else style="color: #aaa;">无参数</p>
    </section>
  </div>
</template>
