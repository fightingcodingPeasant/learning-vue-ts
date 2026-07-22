<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

interface Product {
  id: number
  name: string
  price: number
  image?: string
}

const products: Product[] = [
  { id: 1, name: 'Vue 3 实战', price: 99 },
  { id: 2, name: 'TypeScript 入门', price: 79 },
  { id: 3, name: 'Pinia 状态管理', price: 59 },
]

function addToCart(product: Product) {
  cart.addItem(product)
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 500px; background: #fafafa;">
    <h3 style="margin-top: 0;">🛒 Pinia 购物车 Store</h3>

    <!-- 商品列表 -->
    <section style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">商品列表</h4>
      <ul style="padding-left: 20px;">
        <li v-for="product in products" :key="product.id" style="margin-bottom: 8px;">
          {{ product.name }} - ¥{{ product.price }}
          <button @click="addToCart(product)" style="margin-left: 8px; padding: 2px 12px; cursor: pointer;">加入购物车</button>
        </li>
      </ul>
    </section>

    <!-- 购物车 -->
    <section style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
      <h4 style="margin: 0 0 8px;">购物车（全局共享）</h4>
      <p v-if="cart.items.length === 0" style="color: #aaa;">空空如也~</p>
      <ul v-else style="padding-left: 20px;">
        <li v-for="item in cart.items" :key="item.id" style="margin-bottom: 4px;">
          {{ item.name }} x{{ item.quantity }} — ¥{{ item.subtotal }}
        </li>
      </ul>
      <hr style="border: none; border-top: 1px solid #eee; margin: 8px 0;" />
      <p><strong>总计：¥{{ cart.total }}</strong></p>
      <button @click="cart.clear()" style="padding: 4px 12px; cursor: pointer; background: #f56c6c; color: white; border: none; border-radius: 4px;">清空购物车</button>
      <p style="color: #888; font-size: 13px; margin-top: 8px;">
        💡 Pinia store 是全局单例，任何组件都能读取/修改<br/>
        💡 state/getter/action 都有完整类型保护
      </p>
    </section>
  </div>
</template>
