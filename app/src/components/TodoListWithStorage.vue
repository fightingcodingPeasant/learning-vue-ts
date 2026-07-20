<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'

interface Todo {
  id: string
  text: string
  done: boolean
}

// 使用 Composable 持久化 todo 列表
const { data: todos, reset } = useLocalStorage<Todo[]>('session5-todos', [
  { id: '1', text: '学 Composable 逻辑复用', done: true },
  { id: '2', text: '刷新页面测试持久化', done: false },
])

let filter = ref<'all' | 'done' | 'undone'>('all')
let newText = ref('')

function addTodo() {
  if (!newText.value.trim()) return
  todos.value.push({
    id: Date.now().toString(),
    text: newText.value.trim(),
    done: false,
  })
  newText.value = ''
}

function handleToggle(id: string) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.done = !todo.done
}

function handleRemove(id: string) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

let filteredTodos = computed(() => {
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  if (filter.value === 'undone') return todos.value.filter((t) => !t.done)
  return todos.value
})

let doneCount = computed(() => todos.value.filter((t) => t.done).length)
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 400px; background: #fafafa;">
    <h3 style="margin-top: 0;">📝 持久化 Todo（Session 5）</h3>

    <!-- 添加输入框 -->
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <input
        v-model="newText"
        @keyup.enter="addTodo"
        placeholder="添加新任务..."
        style="padding: 6px 12px; flex: 1; font-size: 14px;"
      />
      <button @click="addTodo" style="padding: 6px 16px; cursor: pointer; background: #409eff; color: white; border: none; border-radius: 4px;">添加</button>
    </div>

    <!-- 筛选按钮 -->
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <button
        @click="filter = 'all'"
        :style="{ padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: filter === 'all' ? '#409eff' : '#e0e0e0', color: filter === 'all' ? '#fff' : '#333' }"
      >全部</button>
      <button
        @click="filter = 'undone'"
        :style="{ padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: filter === 'undone' ? '#409eff' : '#e0e0e0', color: filter === 'undone' ? '#fff' : '#333' }"
      >未完成</button>
      <button
        @click="filter = 'done'"
        :style="{ padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: filter === 'done' ? '#409eff' : '#e0e0e0', color: filter === 'done' ? '#fff' : '#333' }"
      >已完成</button>
      <button
        @click="reset"
        style="margin-left: auto; padding: 4px 12px; cursor: pointer; background: #f56c6c; color: white; border: none; border-radius: 4px;"
      >清空</button>
    </div>

    <!-- 统计 -->
    <p style="color: #666; font-size: 14px;">
      共 {{ todos.length }} 项，已完成 {{ doneCount }} 项
    </p>

    <!-- 列表 -->
    <div v-if="filteredTodos.length === 0" style="color: #aaa; text-align: center; padding: 20px;">
      空空如也~
    </div>
    <div v-else>
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid #eee;"
      >
        <span
          @click="handleToggle(todo.id)"
          :style="{ flex: 1, cursor: 'pointer', textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#aaa' : '#333' }"
        >{{ todo.text }}</span>
        <button
          @click="handleRemove(todo.id)"
          style="background: none; border: 1px solid #f56c6c; color: #f56c6c; border-radius: 4px; padding: 2px 10px; cursor: pointer;"
        >删除</button>
      </div>
    </div>

    <p style="color: #888; font-size: 13px;">
      💡 数据自动保存到 localStorage，刷新页面后还在！
    </p>
  </div>
</template>
