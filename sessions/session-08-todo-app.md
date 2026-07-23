# Session 8: 实战 TodoList — 把所有知识串起来做完整项目

**日期：** 2026-07-22  
**目标：** 用已学知识做一个功能完整的 TodoList 应用  
**状态：** ✅ 已完成

---

## 功能清单

| 功能 | 用到的知识点 |
|------|------------|
| 添加任务 | ref, v-model, @keyup.enter |
| 删除任务 | computed 过滤, 数组操作 |
| 编辑任务 | 双击触发编辑, Enter 保存, Esc 取消 |
| 完成/取消完成 | checkbox, toggle |
| 全选/取消 | computed 判断全部完成, 批量修改 |
| 筛选（全部/未完成/已完成）| ref + computed 过滤 |
| 清除已完成 | 数组 filter |
| 计数显示 | computed |

---

## 核心代码结构

```typescript
interface Todo {
  id: string
  text: string
  done: boolean
}

const todos = ref<Todo[]>([])
let newTodoText = ref('')
let filter = ref<'all' | 'done' | 'undone'>('all')
let editingId = ref<string | null>(null)
let editingText = ref('')

// 计算属性
let filteredTodos = computed(() => { /* 根据 filter 过滤 */ })
let doneCount = computed(() => todos.value.filter(t => t.done).length)

// 操作方法
function addTodo() { /* 添加 */ }
function toggleTodo(id: string) { /* 切换完成 */ }
function removeTodo(id: string) { /* 删除 */ }
function startEdit(todo: Todo) { /* 开始编辑 */ }
function saveEdit(id: string) { /* 保存编辑 */ }
function clearDone() { /* 清除已完成 */ }
function toggleAll() { /* 全选/取消 */ }
```

---

## 关键技巧

### 1. 双击编辑

```html
<span @dblclick="startEdit(todo)">{{ todo.text }}</span>
```

```typescript
function startEdit(todo: Todo) {
  editingId.value = todo.id
  editingText.value = todo.text
}
```

### 2. 条件渲染（编辑/显示模式切换）

```html
<template v-if="editingId === todo.id">
  <input v-model="editingText" @keyup.enter="saveEdit(todo.id)" />
</template>
<template v-else>
  <span @dblclick="startEdit(todo)">{{ todo.text }}</span>
</template>
```

### 3. 全选逻辑

```typescript
function toggleAll() {
  const allDone = todos.value.every((t) => t.done)
  todos.value.forEach((t) => { t.done = !allDone })
}
```

### 4. 键盘事件

```html
<input @keyup.enter="addTodo" />
<input @keyup.escape="cancelEdit" />
```

---

## 学到的东西

- **ref** — 管理所有状态
- **computed** — 派生 filteredTodos, doneCount, totalCount
- **v-model** — 输入框双向绑定
- **v-for/v-if** — 列表渲染和条件显示
- **@click/@dblclick/@keyup** — 多种事件处理
- **TypeScript** — Todo interface 全链路类型保护

---

## 复盘问题

- **Q: 为什么用 ref<string | null> 而不是 boolean？**  
  A: 需要知道正在编辑哪个 todo，用 id 比布尔值更精确。

- **Q: 编辑时怎么区分保存和取消？**  
  A: Enter 键触发 saveEdit，Esc 键触发 cancelEdit。

- **Q: 全选逻辑为什么用 every + forEach？**  
  A: every 判断是否全部完成，然后取反批量修改。

---

## 学习笔记

> Session 8 把前面所有知识串起来做了一个完整的 TodoList 应用。核心思路：**ref 存数据，computed 算状态，函数做操作**。

> 编辑功能是关键难点——用 editingId 跟踪当前编辑项，条件渲染切换 input/span。

> TypeScript 贯穿始终：Todo interface 定义了数据结构，所有操作都有类型保护。

---

## 费曼复述

> Session 8 用之前学的所有知识做了一个完整的 TodoList 应用：

> 1. **ref** 管理 todos 列表、输入框、筛选状态、编辑状态
> 2. **computed** 派生出 filteredTodos（按筛选条件过滤）、doneCount（已完成数量）
> 3. **函数** 实现 CRUD：add/toggle/remove/edit/clear/toggleAll
> 4. **事件** 处理：@click 点击、@dblclick 双击编辑、@keyup.enter 回车提交、@keyup.escape 取消编辑

> 核心设计模式：**ref 存数据 → computed 算状态 → 函数做操作 → 模板展示交互**。
