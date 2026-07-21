<script setup lang="ts">
import { ref } from 'vue'

// ===== Q1: ref<T>() — 泛型手动指定类型 =====

// 基础类型：TS 自动推断，不需要写泛型
let userName = ref('小明')
let userAge = ref(18)
let isActive = ref(true)

// 复杂类型必须写泛型，否则 TS 不知道是什么
interface User {
  name: string
  age: number
  email?: string
}

// ref<User> — 告诉 TS：这个 ref 里面装的是 User 对象
let user = ref<User>({
  name: '小明',
  age: 18,
})

function updateName() {
  user.value.name = '小红'
}

function updateEmail() {
  user.value.email = 'xiaohong@example.com'
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 400px; background: #fafafa;">
    <h3 style="margin-top: 0;">🔤 ref&lt;T&gt; 泛型类型指定</h3>

    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">基础类型（TS 自动推断）</h4>
      <p>用户名：<strong>{{ userName }}</strong></p>
      <p>年龄：<strong>{{ userAge }}</strong></p>
      <p>是否活跃：<strong>{{ isActive ? '✅' : '❌' }}</strong></p>
      <div style="display: flex; gap: 8px;">
        <button @click="userName = '小明'" style="padding: 4px 12px; cursor: pointer;">设为小明</button>
        <button @click="userAge = 20" style="padding: 4px 12px; cursor: pointer;">设为 20 岁</button>
        <button @click="isActive = !isActive" style="padding: 4px 12px; cursor: pointer;">切换状态</button>
      </div>
    </section>

    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">复杂类型（ref&lt;User&gt; 泛型指定）</h4>
      <p>姓名：<strong>{{ user.name }}</strong></p>
      <p>年龄：<strong>{{ user.age }}</strong></p>
      <p v-if="user.email">邮箱：<strong>{{ user.email }}</strong></p>
      <p v-else style="color: #aaa;">邮箱：未设置</p>
      <div style="display: flex; gap: 8px;">
        <button @click="updateName" style="padding: 4px 12px; cursor: pointer;">改名</button>
        <button @click="updateEmail" style="padding: 4px 12px; cursor: pointer;">设邮箱</button>
      </div>
    </section>
  </div>
</template>
