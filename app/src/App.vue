<script setup lang="ts">
import { ref, computed } from 'vue'
import UserProfile from './components/UserProfile.vue'
import Button from './components/Button.vue'
import TodoList from './components/TodoList.vue'
import WatchDemo from './components/WatchDemo.vue'
import TextWatchDemo from './components/TextWatchDemo.vue'
import WatchEffectDemo from './components/WatchEffectDemo.vue'
import LifecycleDemo from './components/LifecycleDemo.vue'
import ComposableCounterDemo from './components/ComposableCounterDemo.vue'
import TodoListWithStorage from './components/TodoListWithStorage.vue'
import RefTypeDemo from './components/RefTypeDemo.vue'
import ReactiveDemo from './components/ReactiveDemo.vue'
import ShallowRefDemo from './components/ShallowRefDemo.vue'
import ReadonlyDemo from './components/ReadonlyDemo.vue'
import RouterDemo from './components/RouterDemo.vue'
import PiniaCartDemo from './components/PiniaCartDemo.vue'

// ===== 计数器部分 =====
let count = ref(0)

function add() { count.value++ }
function minus() { count.value-- }
function reset() { count.value = 0 }

let message = computed(() => {
  if (count.value === 0) return '空空如也'
  if (count.value > 10) return '太多了！'
  return `当前是 ${count.value}`
})

// ===== 输入框 + 字数统计 =====
let text = ref('')
let charCount = computed(() => text.value.length)

let hint = computed(() => {
  if (charCount.value === 0) return ''
  if (charCount.value > 10) return '太长了！'
  return `${charCount.value}/10`
})

// ===== Session 3 数据 =====
const demoUser = ref({
  name: '小明',
  email: 'xiaoming@example.com',
  age: 18,
})
</script>

<template>
  <div style="padding: 20px; max-width: 700px; margin: 0 auto;">
    <!-- 计数器 -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔢 计数器（Session 2）</h2>
      <p>{{ message }} — 计数：{{ count }}</p>
      <button @click="minus">-</button>
      <button @click="add">+</button>
      <button @click="reset">重置</button>
    </section>

    <!-- 输入框 -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>✏️ 字数统计（Session 2）</h2>
      <input v-model="text" placeholder="在这里输入文字..."
             style="padding: 8px; width: 300px; font-size: 16px;" />
      <p>你输入了 {{ charCount }} 个字</p>
      <p v-if="hint" :style="{ color: hint === '太长了！' ? 'red' : 'green' }">
        {{ hint }}
      </p>
    </section>

    <!-- Q1: UserProfile -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>👤 Q1: UserProfile（defineProps）</h2>
      <UserProfile :user="demoUser" />
    </section>

    <!-- Q2: Button -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔘 Q2: Button（withDefaults）</h2>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button size="small">小号</Button>
        <Button size="large">大号</Button>
        <Button disabled>禁用状态</Button>
        <Button loading>加载中...</Button>
      </div>
    </section>

    <!-- Q3: TodoList -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>📝 Q3: TodoList（defineEmits）</h2>
      <TodoList />
    </section>

    <!-- Q4: WatchDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>⏱️ Q4-1: WatchDemo（watch 数字）</h2>
      <WatchDemo />
    </section>

    <!-- Q5: TextWatchDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>⏱️ Q4-2: TextWatchDemo（watch 字符串）</h2>
      <TextWatchDemo />
    </section>

    <!-- Q6: WatchEffectDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>⏱️ Q4-3: WatchEffectDemo（自动追踪）</h2>
      <WatchEffectDemo />
    </section>

    <!-- Q7: LifecycleDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>⏱️ Q4-4: LifecycleDemo（生命周期 + 防抖搜索）</h2>
      <LifecycleDemo />
    </section>

    <!-- Q8: ComposableCounterDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔄 Q5-1: ComposableCounterDemo（useCounter）</h2>
      <ComposableCounterDemo />
    </section>

    <!-- Q9: TodoListWithStorage -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>💾 Q5-2: TodoListWithStorage（useLocalStorage）</h2>
      <TodoListWithStorage />
    </section>

    <!-- Q10: RefTypeDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔤 Q6-1: RefTypeDemo（ref&lt;T&gt;泛型）</h2>
      <RefTypeDemo />
    </section>

    <!-- Q11: ReactiveDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>📦 Q6-2: ReactiveDemo（reactive类型推导）</h2>
      <ReactiveDemo />
    </section>

    <!-- Q12: ShallowRefDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>⚡ Q6-3: ShallowRefDemo（shallowRef vs ref）</h2>
      <ShallowRefDemo />
    </section>

    <!-- Q13: ReadonlyDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🔒 Q6-4: ReadonlyDemo（readonly只读）</h2>
      <ReadonlyDemo />
    </section>

    <!-- Q14: RouterDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🧭 Q7-1: RouterDemo（Vue Router）</h2>
      <RouterDemo />
    </section>

    <!-- Q15: PiniaCartDemo -->
    <section style="margin-bottom: 30px; border: 1px solid #eee; padding: 16px; border-radius: 8px;">
      <h2>🛒 Q7-2: PiniaCartDemo（Pinia Store）</h2>
      <PiniaCartDemo />
    </section>
  </div>
</template>
