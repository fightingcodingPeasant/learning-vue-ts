# Vue + TypeScript 学习计划

> 目标：零基础 → 能用 TS 写 Vue 项目
> 总时长：约 20 小时（10 次 × 2 小时）
> 开始日期：2026-07-13
> 当前进度：第 1 次进行中 ⏳

---

## 📊 学习阶梯

| 级别 | 主题 | 预计时间 | 状态 |
|------|------|---------|------|
| 1️⃣ | TS 基础类型 | 2h | ⏳ 进行中 |
| 2️⃣ | Vue 3 组件基础 | 2h | 🔲 未开始 |
| 3️⃣ | Props/Emits 类型 | 2h | 🔲 未开始 |
| 4️⃣ | 响应式系统类型推断 | 2h | 🔲 未开始 |
| 5️⃣ | 生命周期 & 监听器 | 2h | 🔲 未开始 |
| 6️⃣ | Composable 逻辑复用 | 2h | 🔲 未开始 |
| 7️⃣ | 路由 + Pinia 类型安全 | 2h | 🔲 未开始 |
| 8️⃣ | 实战：TodoList | 2h | 🔲 未开始 |
| 9️⃣ | 表单验证 + 指令 | 2h | 🔲 未开始 |
| 🔟 | 巩固 + 速查表 + 自测 | 2h | 🔲 未开始 |

---

## 第 1 次：TypeScript 入门 — 告别 any

**目标：** 掌握基础类型、interface、函数类型声明

### 核心知识点

#### 1. 类型声明
```typescript
let name: string = "小明"    // 字符串
let age: number = 18         // 数字
let isActive: boolean = true // 真或假
let tags: string[] = ["a", "b"] // 数组
```

#### 2. interface（对象模板）
```typescript
interface User {
  name: string
  age: number
  email?: string  // ? = 可选
}
```

#### 3. 函数类型
```typescript
function add(a: number, b: number): number {
  return a + b
}
```

### 练习题（待完成）

- [ ] Q1: 用你自己的话解释为什么 TS 需要类型声明
- [ ] Q2: 解释 interface 中 `?` 的作用
- [ ] Q3: 写出 `interface Book` 的定义
- [ ] Q4: 定义一个 `interface Product`（名称/价格/库存）
- [ ] Q5: 写一个函数 `calcTotal(product: Product, count: number): number`

### 复盘问题（待完成）

- [ ] interface 和 type 什么时候用哪个？
- [ ] 可选属性的 `?` 加和不加有什么区别？

### 学习笔记

> 记录你的理解和疑问：


### 费曼复述

> 用自己的话总结今天学到的内容：


---

## 第 2 次：Vue 3 组件基础

**目标：** 写出第一个能跑的 Vue 组件

### 核心知识点

- `<script setup>` 语法
- `ref()` 响应式数据
- 模板插值 `{{ }}`
- 计算属性 `computed()`

### 练习题

- [ ] 计数器组件（+1 / -1 / 重置）
- [ ] 输入框 + 字数显示
- [ ] 超过 10 字提示"太长了"

### 复盘问题

- [ ] ref 和普通变量的区别？
- [ ] computed 和 method 怎么选？

### 学习笔记

>


### 费曼复述

>


---

## 第 3 次：Props/Emits 类型安全

**目标：** 父子组件通信都有类型保护

### 核心知识点

- `defineProps<{ ... }>()`
- `defineEmits<...>()`
- `withDefaults`

### 练习题

- [ ] UserProfile 组件（接收 user prop）
- [ ] Button 组件（type/size/disabled）
- [ ] 子组件事件传值带类型

### 复盘问题

- [ ] defineProps 后面那个 `<{ ... }>` 是干嘛的？
- [ ] emits 的类型怎么写？

### 学习笔记

>


### 费曼复述

>


---

## 第 4 次：响应式系统的类型推断

**目标：** 让 TS 正确推断响应式数据的类型

### 核心知识点

- `ref<T>()` 泛型手动指定
- `reactive()` 类型推导
- `shallowRef` vs `ref`
- `readonly()`

### 练习题

- [ ] ref 定义数组类型列表
- [ ] reactive 定义嵌套对象
- [ ] store 状态设为 readonly

### 复盘问题

- [ ] ref.value 是什么意思？
- [ ] shallowRef 和 ref 性能差在哪？

### 学习笔记

>


### 费曼复述

>


---

## 第 5 次：生命周期 & 监听器

**目标：** 在合适时机执行副作用

### 核心知识点

- `onMounted` / `onUnmounted`
- `watch()` 和 `watchEffect()`
- 深度监听 `deep`

### 练习题

- [ ] 挂载时发模拟请求
- [ ] 搜索框实时过滤
- [ ] watchEffect 同步到 localStorage

### 复盘问题

- [ ] watch 和 watchEffect 怎么选？
- [ ] onMounted 里能改 ref 吗？

### 学习笔记

>


### 费曼复述

>


---

## 第 6 次：Composable 逻辑复用

**目标：** 把可复用逻辑抽成函数

### 核心知识点

- useXxx 命名规范
- 返回 ref/reactive
- 类型定义的 Composable

### 练习题

- [ ] useCounter()
- [ ] useFetch(url)
- [ ] useLocalStorage(key)

### 复盘问题

- [ ] 为什么叫 useXxx？
- [ ] Composable 里能用生命周期钩子吗？

### 学习笔记

>


### 费曼复述

>


---

## 第 7 次：路由 + Pinia 类型安全

**目标：** 导航和状态管理都有类型保护

### 核心知识点

- 路由参数类型
- Pinia state/getter/action 类型
- 路由守卫

### 练习题

- [ ] 两个页面 + 导航链接
- [ ] 全局购物车 store
- [ ] 未登录跳转登录页

### 复盘问题

- [ ] useRoute().params 的类型怎么获取？
- [ ] Pinia 的 defineStore 怎么声明类型？

### 学习笔记

>


### 费曼复述

>


---

## 第 8 次：实战 TodoList

**目标：** 把所有知识串起来做完整项目

### 功能清单

- [ ] 添加/删除/编辑/完成 todo
- [ ] 筛选（全部/已完成/未完成）
- [ ] 本地存储持久化
- [ ] 所有数据都有类型

### 复盘问题

- [ ] 项目中哪些地方用了 TS？
- [ ] 加"批量操作"类型要怎么改？

### 学习笔记

>


### 费曼复述

>


---

## 第 9 次：表单验证 + 指令

**目标：** 处理复杂表单和自定义指令

### 核心知识点

- v-model 类型
- 自定义指令 TS 声明
- 表单验证

### 练习题

- [ ] 注册表单（用户名/邮箱/密码）
- [ ] 自定义 v-focus 指令
- [ ] 实时邮箱格式验证

### 复盘问题

- [ ] v-model 底层原理？
- [ ] 自定义指令的钩子有哪些？

### 学习笔记

>


### 费曼复述

>


---

## 第 10 次：巩固 + 速查表 + 自测

**目标：** 回顾全部内容，生成个人速查表

### 内容

- [ ] 费曼逐条回顾
- [ ] AI 考官 10 题自测
- [ ] 生成一页速查表
- [ ] 规划下一步方向

---

## 📚 资源清单

1. [Vue 官方文档](https://cn.vuejs.org/guide/introduction.html) — 中文一手文档
2. [TS 官方手册](https://www.typescriptlang.org/zh/docs/) — 查类型问题
3. [Vite + Vue + TS 模板](https://vite.new/vue-ts) — 一键创建项目
4. [freeCodeCamp 教程](https://www.freecodecamp.org/chinese/learn/) — 免费视频
5. [Pinia 源码](https://github.com/vuejs/pinia) — 进阶参考

---

## 🗓 学习日历

建议按此节奏推进（可根据实际情况调整）：

| 日期 | 任务 | 状态 |
|------|------|------|
| 7/13 | 第 1 次：TS 基础 | ✅ 已安排 |
| 7/14 | 第 2 次：Vue 组件基础 | 🔲 |
| 7/15 | 第 3 次：Props/Emits | 🔲 |
| 7/16 | 第 4 次：响应式类型 | 🔲 |
| 7/17 | 第 5 次：生命周期 | 🔲 |
| 7/18 | 第 6 次：Composable | 🔲 |
| 7/19 | 第 7 次：路由+Pinia | 🔲 |
| 7/20 | 第 8 次：Todo 实战 | 🔲 |
| 7/21 | 第 9 次：表单+指令 | 🔲 |
| 7/22 | 第 10 次：巩固自测 | 🔲 |

---

*最后更新：2026-07-13*
