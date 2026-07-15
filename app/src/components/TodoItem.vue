<script setup lang="ts">
// ===== Q3: TodoItem —— 子组件，带 toggle / remove 事件 =====

interface Todo {
  id: string
  text: string
  done: boolean
}

defineProps<{
  todo: Todo
}>()

// 定义可触发的事件及参数类型
const emit = defineEmits<{
  toggle: () => void
  remove: (id: string) => void
}>()
</script>

<template>
  <div style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid #eee;">
    <!-- 点击文字触发 toggle -->
    <span
      @click="emit('toggle')"
      :style="{
        flex: 1,
        cursor: 'pointer',
        textDecoration: todo.done ? 'line-through' : 'none',
        color: todo.done ? '#aaa' : '#333',
      }"
    >
      {{ todo.text }}
    </span>
    <!-- 点击删除按钮触发 remove -->
    <button
      @click="emit('remove', todo.id)"
      style="background: none; border: 1px solid #f56c6c; color: #f56c6c; border-radius: 4px; padding: 2px 10px; cursor: pointer;"
    >
      删除
    </button>
  </div>
</template>
