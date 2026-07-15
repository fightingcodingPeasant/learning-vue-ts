<script setup lang="ts">
// ===== Q2: Button —— 支持 type / size / disabled / loading =====

import { computed } from 'vue'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
})

// 根据 type 映射颜色
const colorMap: Record<string, string> = {
  primary: '#409eff',
  secondary: '#909399',
  danger: '#f56c6c',
}

// 根据 size 映射字号和 padding
const sizeMap: Record<string, { fontSize: string; padding: string }> = {
  small:  { fontSize: '12px', padding: '4px 12px' },
  medium: { fontSize: '14px', padding: '8px 20px' },
  large:  { fontSize: '16px', padding: '12px 28px' },
}

const btnStyle = computed(() => {
  const base = {
    color: props.disabled || props.loading ? '#ccc' : '#fff',
    backgroundColor: props.disabled ? '#e0e0e0' : colorMap[props.type!] || colorMap.primary,
    fontSize: sizeMap[props.size!].fontSize,
    padding: sizeMap[props.size!].padding,
    border: 'none',
    borderRadius: '6px',
    cursor: props.disabled || props.loading ? 'not-allowed' : 'pointer',
    opacity: props.disabled || props.loading ? 0.6 : 1,
  }
  return base
})
</script>

<template>
  <button :disabled="props.disabled" :style="btnStyle">
    <slot v-if="!props.loading" />
    <span v-else>加载中...</span>
  </button>
</template>
