<script setup lang="ts">
import { computed } from 'vue'
// ===== Q1: UserProfile —— 接收 user prop 并展示信息 =====

interface User {
  name: string
  email: string
  age: number
}

const props = defineProps<{
  user: User
}>()

let isAdult = computed(() => props.user.age >= 18)
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 360px; background: #fafafa;">
    <h3 style="margin-top: 0;">👤 用户资料</h3>
    <p><strong>姓名：</strong>{{ props.user.name }}</p>
    <p><strong>邮箱：</strong>{{ props.user.email }}</p>
    <p><strong>年龄：</strong>{{ props.user.age }} 岁</p>
    <p>
      <strong>状态：</strong>
      <span :style="{ color: isAdult ? 'green' : 'orange', fontWeight: 'bold' }">
        {{ isAdult ? '成年人' : '未成年人' }}
      </span>
    </p>
  </div>
</template>
