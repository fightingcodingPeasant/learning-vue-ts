<script setup lang="ts">
// ===== Q3: TodoList —— 父组件，管理 todo 列表并渲染 TodoItem =====

import { ref, computed } from 'vue'
import TodoItem from './TodoItem.vue'

interface Todo {
  id: string
  text: string
  done: boolean
}

const todos = ref<Todo[]>([
  { id: '1', text: '学 Vue 3 组件基础', done: true },
  { id: '2', text: '学 Props/Emits 类型安全', done: false },
  { id: '3', text: '写一个完整项目', done: false },
])

function handleToggle(id: string) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.done = !todo.done
}

function handleRemove(id: string) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

let filter = ref<'all' | 'done' | 'undone'>('all')

let filteredTodos = computed(() => {
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  if (filter.value === 'undone') return todos.value.filter((t) => !t.done)
  return todos.value
})
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 400px; background: #fafafa;">
    <h3 style="margin-top: 0;">📝 Todo 列表</h3>

    <!-- 筛选按钮 -->
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <button
        @click="filter = 'all'"
        :style="{
          padding: '4px 12px', borderRadius: '4px', border: 'none',
          cursor: 'pointer', background: filter === 'all' ? '#409eff' : '#e0e0e0',
          color: filter === 'all' ? '#fff' : '#333',
        }"
      >全部</button>
      <button
        @click="filter = 'undone'"
        :style="{
          padding: '4px 12px', borderRadius: '4px', border: 'none',
          cursor: 'pointer', background: filter === 'undone' ? '#409eff' : '#e0e0e0',
          color: filter === 'undone' ? '#fff' : '#333',
        }"
      >未完成</button>
      <button
        @click="filter = 'done'"
        :style="{
          padding: '4px 12px', borderRadius: '4px', border: 'none',
          cursor: 'pointer', background: filter === 'done' ? '#409eff' : '#e0e0e0',
          color: filter === 'done' ? '#fff' : '#333',
        }"
      >已完成</button>
    </div>

    <!-- 列表 -->
    <div v-if="filteredTodos.length === 0" style="color: #aaa; text-align: center; padding: 20px;">
      空空如也~
    </div>
    <div v-else>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="handleToggle(todo.id)"
        @remove="handleRemove(todo.id)"
      />
    </div>
  </div>
</template>
