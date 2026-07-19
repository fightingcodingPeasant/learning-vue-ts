# learning-vue-ts

## 项目定位
Vue 3 + TypeScript 学习笔记项目。每个 session 对应一个学习主题，包含代码示例和学习笔记。

## 技术栈
- Vue 3.5+ (Composition API + `<script setup>`)
- TypeScript strict mode
- Vite 6 + vue-tsc
- Bun / npm 管理依赖（`app/` 子目录）

## 目录结构
- `app/src/components/` — 学习用组件（每个文件对应一个知识点）
- `app/src/main.ts` — 入口，挂载 App.vue
- `sessions/` — 学习笔记 Markdown 文件（session-01 ~ session-04）
- `vue-ts-learning-plan.md` — 整体学习路线

## 组件命名规范
- 组件文件名：PascalCase（如 `WatchDemo.vue`）
- 组件内部用 `defineProps<T>()` / `defineEmits<T>()` 类型安全声明
- Props 用 `withDefaults` 设置默认值
- 测试相关组件放在同名目录下，如 `WatchEffectDemo.vue`

## 编码约定
- 样式用 CSS 变量 + scoped style
- 不使用 Pinia/Vue Router，保持单页面教学演示
- 每个组件独立可运行，不依赖其他自定义组件（TodoList → TodoItem 除外）
