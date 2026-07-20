import { ref } from 'vue'

// ===== useCounter — 可复用的计数器逻辑 =====
export function useCounter(initialValue = 0) {
  let count = ref(initialValue)

  function add(n = 1) { count.value += n }
  function minus(n = 1) { count.value -= n }
  function reset() { count.value = initialValue }

  return { count, add, minus, reset }
}
