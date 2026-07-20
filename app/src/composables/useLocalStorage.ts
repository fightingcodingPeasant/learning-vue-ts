import { ref, watch } from 'vue'

// ===== useLocalStorage — 自动同步到 localStorage =====
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  let value = stored ? JSON.parse(stored) : defaultValue

  const data = ref(value as T)

  // 每次数据变化时同步到 localStorage
  watch(data, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  function reset() {
    data.value = defaultValue
  }

  return { data, reset }
}
