<script setup lang="ts">
import { reactive } from 'vue'

// ===== Q2: reactive() — 对象/数组的类型推导 =====

interface Product {
  name: string
  price: number
  stock: number
}

// reactive 不需要泛型，TS 会根据传入的对象自动推断类型
let product = reactive<Product>({
  name: 'Vue 3 实战',
  price: 99,
  stock: 100,
})

function increasePrice() {
  product.price += 10
}

function decreaseStock() {
  product.stock -= 1
}

// reactive 的嵌套对象也是响应式的
let store = reactive({
  name: '书店',
  products: [
    { name: 'Vue 3 实战', price: 99, stock: 100 },
    { name: 'TypeScript 入门', price: 79, stock: 50 },
  ],
})

function addProduct() {
  store.products.push({
    name: '新商品',
    price: 0,
    stock: 0,
  })
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">📦 reactive() 类型推导</h3>

    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">商品信息（reactive 自动推断类型）</h4>
      <p>名称：<strong>{{ product.name }}</strong></p>
      <p>价格：<strong>¥{{ product.price }}</strong></p>
      <p>库存：<strong>{{ product.stock }} 件</strong></p>
      <div style="display: flex; gap: 8px;">
        <button @click="increasePrice" style="padding: 4px 12px; cursor: pointer;">涨价 ¥10</button>
        <button @click="decreaseStock" style="padding: 4px 12px; cursor: pointer;">卖出 1 件</button>
      </div>
    </section>

    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">商店货架（嵌套对象也是响应式的）</h4>
      <p>商店名：<strong>{{ store.name }}</strong></p>
      <ul style="margin: 8px 0; padding-left: 20px;">
        <li v-for="(item, index) in store.products" :key="index">
          {{ item.name }} - ¥{{ item.price }} (库存 {{ item.stock }})
        </li>
      </ul>
      <button @click="addProduct" style="padding: 4px 12px; cursor: pointer;">添加商品</button>
    </section>
  </div>
</template>
