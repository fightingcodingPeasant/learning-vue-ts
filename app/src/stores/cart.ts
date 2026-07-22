import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  subtotal: number
}

export const useCartStore = defineStore('cart', () => {
  // ===== state（响应式数据）=====
  let items = ref<CartItem[]>([])

  // ===== getter（计算属性）=====
  let total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.subtotal, 0)
  })

  let itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // ===== action（修改数据的方法）=====
  function addItem(product: { id: number; name: string; price: number }) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
      existing.subtotal = existing.price * existing.quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price,
      })
    }
  }

  function removeItem(id: number) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, total, itemCount, addItem, removeItem, clear }
})
