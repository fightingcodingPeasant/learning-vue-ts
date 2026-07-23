<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: string
  text: string
  done: boolean
}

// ===== 状态 =====
const todos = ref<Todo[]>([
  { id: '1', text: '学 Vue 3 组件基础', done: true },
  { id: '2', text: '学 Props/Emits 类型安全', done: false },
  { id: '3', text: '写一个完整项目', done: false },
])

let newTodoText = ref('')
let filter = ref<'all' | 'done' | 'undone'>('all')
let editingId = ref<string | null>(null)
let editingText = ref('')

// ===== 计算属性 =====
let filteredTodos = computed(() => {
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  if (filter.value === 'undone') return todos.value.filter((t) => !t.done)
  return todos.value
})

let doneCount = computed(() => todos.value.filter((t) => t.done).length)
let totalCount = computed(() => todos.value.length)

// ===== 操作 =====
function addTodo() {
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({
    id: Date.now().toString(),
    text,
    done: false,
  })
  newTodoText.value = ''
}

function toggleTodo(id: string) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: string) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

function startEdit(todo: Todo) {
  editingId.value = todo.id
  editingText.value = todo.text
}

function saveEdit(id: string) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo && editingText.value.trim()) {
    todo.text = editingText.value.trim()
  }
  editingId.value = null
  editingText.value = ''
}

function cancelEdit() {
  editingId.value = null
  editingText.value = ''
}

function clearDone() {
  todos.value = todos.value.filter((t) => !t.done)
}

function toggleAll() {
  const allDone = todos.value.every((t) => t.done)
  todos.value.forEach((t) => { t.done = !allDone })
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">✅ TodoList 实战（Session 8）</h3>

    <!-- 顶部工具栏 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="color: #666; font-size: 14px;">
        {{ doneCount }}/{{ totalCount }} 已完成
      </span>
      <button @click="toggleAll" style="padding: 4px 12px; cursor: pointer; font-size: 12px;">全选/取消</button>
    </div>

    <!-- 添加输入框 -->
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <input
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="添加新任务..."
        style="flex: 1; padding: 8px; font-size: 14px;"
      />
      <button @click="addTodo" style="padding: 8px 16px; cursor: pointer; background: #409eff; color: white; border: none; border-radius: 4px;">添加</button>
    </div>

    <!-- 筛选按钮 -->
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <button
        v-for="f in ['all', 'undone', 'done'] as const"
        :key="f"
        @click="filter = f"
        :style="{
          padding: '4px 12px', borderRadius: '4px', border: 'none',
          cursor: 'pointer', fontSize: '12px',
          background: filter === f ? '#409eff' : '#e0e0e0',
          color: filter === f ? '#fff' : '#333',
        }"
      >
        {{ f === 'all' ? '全部' : f === 'undone' ? '未完成' : '已完成' }}
      </button>
      <button
        @click="clearDone"
        style="margin-left: auto; padding: 4px 12px; cursor: pointer; font-size: 12px; background: none; border: 1px solid #f56c6c; color: #f56c6c; border-radius: 4px;"
      >清除已完成</button>
    </div>

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
        <!-- 复选框 -->
        <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo.id)" style="cursor: pointer;" />

        <!-- 编辑/显示 -->
        <template v-if="editingId === todo.id">
          <input
            v-model="editingText"
            @keyup.enter="saveEdit(todo.id)"
            @keyup.escape="cancelEdit"
            style="flex: 1; padding: 4px 8px; font-size: 14px;"
          />
          <button @click="saveEdit(todo.id)" style="padding: 4px 8px; cursor: pointer; font-size: 12px; background: #67c23a; color: white; border: none; border-radius: 4px;">保存</button>
          <button @click="cancelEdit" style="padding: 4px 8px; cursor: pointer; font-size: 12px; background: #909399; color: white; border: none; border-radius: 4px;">取消</button>
        </template>
        <template v-else>
          <span
            @dblclick="startEdit(todo)"
            :style="{
              flex: 1, cursor: 'pointer',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#aaa' : '#333',
            }"
          >{{ todo.text }}</span>
          <button @click="removeTodo(todo.id)" style="padding: 4px 8px; cursor: pointer; font-size: 12px; background: none; border: 1px solid #f56c6c; color: #f56c6c; border-radius: 4px;">删除</button>
        </template>
      </div>
    </div>

    <p style="color: #888; font-size: 13px; margin-top: 12px;">
      💡 双击文字可编辑，按 Enter 保存，Esc 取消
    </p>
  </div>
</template>
