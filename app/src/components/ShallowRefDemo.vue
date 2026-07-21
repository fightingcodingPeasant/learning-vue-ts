<script setup lang="ts">
import { ref, shallowRef } from 'vue'

// ===== Q3: shallowRef vs ref — 性能差异 =====

// ref：深度响应式，对象内部任何属性变化都能触发更新
let deepObj = ref({
  name: 'Vue',
  version: '3.5',
  features: ['Composition API', 'TypeScript'],
})

// shallowRef：浅层响应式，只追踪整体替换，不追踪内部属性变化
let shallowObj = shallowRef({
  name: 'React',
  version: '18',
  features: ['Hooks', 'Virtual DOM'],
})

function updateDeep() {
  // ref 会检测到这个变化
  deepObj.value.name = 'Vue 3'
}

function updateShallow() {
  // shallowRef 不会检测到这个变化！需要整体替换
  shallowObj.value = {
    name: 'React 18',
    version: '18.2',
    features: ['Server Components', 'RSC'],
  }
}

function resetShallow() {
  shallowObj.value = {
    name: 'React',
    version: '18',
    features: ['Hooks', 'Virtual DOM'],
  }
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">⚡ shallowRef vs ref</h3>

    <!-- ref 深度响应式 -->
    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">ref（深度响应式）</h4>
      <p>名称：<strong>{{ deepObj.name }}</strong></p>
      <p>版本：<strong>{{ deepObj.version }}</strong></p>
      <p>特性：{{ deepObj.features.join(', ') }}</p>
      <button @click="updateDeep" style="padding: 4px 12px; cursor: pointer;">更新名称</button>
      <p style="color: #888; font-size: 13px;">
        💡 ref 会追踪内部属性变化，点击按钮后名称立即更新
      </p>
    </section>

    <!-- shallowRef 浅层响应式 -->
    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">shallowRef（浅层响应式）</h4>
      <p>名称：<strong>{{ shallowObj.name }}</strong></p>
      <p>版本：<strong>{{ shallowObj.version }}</strong></p>
      <p>特性：{{ shallowObj.features.join(', ') }}</p>
      <div style="display: flex; gap: 8px;">
        <button @click="updateShallow" style="padding: 4px 12px; cursor: pointer;">整体替换</button>
        <button @click="resetShallow" style="padding: 4px 12px; cursor: pointer;">重置</button>
      </div>
      <p style="color: #888; font-size: 13px;">
        💡 shallowRef 只追踪整体替换，修改内部属性不会触发更新
      </p>
    </section>
  </div>
</template>
