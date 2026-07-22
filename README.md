# Vue + TypeScript 学习笔记

> 目标：零基础 → 能用 TS 写 Vue 项目
> 总时长：约 20 小时（10 次 × 2 小时）
> 开始日期：2026-07-13
> 当前进度：第 7 次 ✅ 已完成

---

## 📊 学习阶梯

| 级别 | 主题 | 预计时间 | 状态 |
|------|------|---------|------|
| 1️⃣ | TS 基础类型 | 2h | ✅ 已完成 |
| 2️⃣ | Vue 3 组件基础 | 2h | ✅ 已完成 |
| 3️⃣ | Props/Emits 类型 | 2h | ✅ 已完成 |
| 4️⃣ | Watchers & 生命周期 | 2h | ✅ 已完成 |
| 5️⃣ | Composable 逻辑复用 | 2h | ✅ 已完成 |
| 6️⃣ | 响应式系统类型推断 | 2h | ✅ 已完成 |
| 7️⃣ | 路由 + Pinia 类型安全 | 2h | ✅ 已完成 |
| 8️⃣ | 实战：TodoList | 2h | 🔲 未开始 |
| 9️⃣ | 表单验证 + 指令 | 2h | 🔲 未开始 |
| 🔟 | 巩固 + 速查表 + 自测 | 2h | 🔲 未开始 |

---

## 🗓 学习日历

建议节奏（可根据实际调整）：

| 日期 | 任务 | 状态 |
|------|------|------|
| 7/13 | 第 1 次：TS 基础 | ✅ 已完成 |
| 7/14 | 第 2 次：Vue 组件基础 | ✅ 已完成 |
| 7/15 | 第 3 次：Props/Emits | ✅ 已完成 |
| 7/18 | 第 4 次：Watchers & 生命周期 | ✅ 已完成 |
| 7/19 | 第 5 次：Composable | ✅ 已完成 |
| 7/20 | 第 6 次：响应式类型 | ✅ 已完成 |
| 7/21 | 第 7 次：路由+Pinia | ✅ 已完成 |
| 7/22 | 第 8 次：Todo 实战 | 🔲 |
| 7/23 | 第 9 次：表单+指令 | 🔲 |
| 7/24 | 第 10 次：巩固自测 | 🔲 |

---

## 📂 项目结构

```
app/src/components/
├── Button.vue              # Session 3 — withDefaults
├── ComposableCounterDemo.vue    # Session 5 — useCounter
├── LifecycleDemo.vue       # Session 4 — 生命周期 + 防抖搜索
├── ReactiveDemo.vue        # Session 6 — reactive 类型推导
├── ReadonlyDemo.vue        # Session 6 — readonly 只读
├── RefTypeDemo.vue         # Session 6 — ref<T> 泛型
├── RouterDemo.vue          # Session 7 — Vue Router 类型安全
├── ShallowRefDemo.vue      # Session 6 — shallowRef vs ref
├── TodoItem.vue            # Session 3 — defineEmits
├── TodoList.vue            # Session 3 — 父组件管理数据
├── TodoListWithStorage.vue # Session 5 — useLocalStorage
├── UserProfile.vue         # Session 3 — defineProps
├── WatchDemo.vue           # Session 4 — watch 监听数字
├── WatchEffectDemo.vue     # Session 4 — watchEffect 自动追踪
└── TextWatchDemo.vue       # Session 4 — watch 监听字符串

app/src/composables/
├── useCounter.ts           # Session 5 — 计数器逻辑
└── useLocalStorage.ts      # Session 5 — localStorage 持久化

app/src/router/
└── index.ts                # Session 7 — 路由配置

app/src/stores/
└── cart.ts                 # Session 7 — Pinia 购物车 Store

app/src/views/
├── AboutView.vue           # Session 7 — 关于页
├── HomeView.vue            # Session 7 — 首页
└── UserView.vue            # Session 7 — 用户详情页

sessions/
├── session-01-ts-basics.md
├── session-02-vue-components.md
├── session-03-props-emits.md
├── session-04-watch-lifecycle.md
├── session-05-composable.md
├── session-06-reactive-types.md
└── session-07-router-pinia.md
```

---

## 📚 资源清单

1. [Vue 官方文档](https://cn.vuejs.org/guide/introduction.html) — 中文一手文档
2. [TS 官方手册](https://www.typescriptlang.org/zh/docs/) — 查类型问题
3. [Vite + Vue + TS 模板](https://vite.new/vue-ts) — 一键创建项目
4. [freeCodeCamp 教程](https://www.freecodecamp.org/chinese/learn/) — 免费视频
5. [Pinia 源码](https://github.com/vuejs/pinia) — 进阶参考

---

*最后更新：2026-07-21 — Session 7 完成（路由 + Pinia 类型安全）*
