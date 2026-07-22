<script setup lang="ts">
interface Props {
  id: string
}

const props = defineProps<Props>()
</script>

<template>
  <div style="padding: 40px 20px; text-align: center;">
    <h1>👤 用户详情</h1>
    <p>用户 ID：<strong>{{ props.id }}</strong></p>
  </div>
</template>
