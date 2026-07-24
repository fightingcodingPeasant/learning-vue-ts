<script setup lang="ts">
import { ref } from 'vue'

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref<FormErrors>({})
const submitted = ref(false)

// ===== 验证规则 =====
function validateUsername(): boolean {
  if (!username.value.trim()) {
    errors.value.username = '用户名不能为空'
    return false
  }
  if (username.value.length < 3) {
    errors.value.username = '用户名至少 3 个字符'
    return false
  }
  if (username.value.length > 20) {
    errors.value.username = '用户名不能超过 20 个字符'
    return false
  }
  delete errors.value.username
  return true
}

function validateEmail(): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.value.email = '邮箱不能为空'
    return false
  }
  if (!emailRegex.test(email.value)) {
    errors.value.email = '请输入有效的邮箱地址'
    return false
  }
  delete errors.value.email
  return true
}

function validatePassword(): boolean {
  if (!password.value) {
    errors.value.password = '密码不能为空'
    return false
  }
  if (password.value.length < 6) {
    errors.value.password = '密码至少 6 个字符'
    return false
  }
  delete errors.value.password
  return true
}

function validateConfirmPassword(): boolean {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = '请确认密码'
    return false
  }
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    return false
  }
  delete errors.value.confirmPassword
  return true
}

function handleSubmit() {
  submitted.value = true
  const valid = [
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
  ].every(Boolean)
  if (valid) {
    alert(`注册成功！\n用户名：${username.value}\n邮箱：${email.value}`)
  }
}

function resetForm() {
  username.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  errors.value = {}
  submitted.value = false
}

function clearError(field: keyof FormErrors) {
  delete errors.value[field]
}
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 20px; max-width: 450px; background: #fafafa;">
    <h3 style="margin-top: 0;">📝 注册表单（Session 9）</h3>

    <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 16px;">
      <!-- 用户名 -->
      <div>
        <label style="font-weight: bold; font-size: 14px;">用户名</label>
        <input
          v-model="username"
          @blur="validateUsername"
          @input="clearError('username')"
          placeholder="3-20 个字符"
          :style="{
            width: '100%', padding: '8px', fontSize: '14px', marginTop: '4px',
            borderColor: errors.username ? '#f56c6c' : '#ddd',
            borderRadius: '4px',
          }"
        />
        <p v-if="errors.username" style="color: #f56c6c; font-size: 12px; margin: 4px 0 0;">{{ errors.username }}</p>
      </div>

      <!-- 邮箱 -->
      <div>
        <label style="font-weight: bold; font-size: 14px;">邮箱</label>
        <input
          v-model="email"
          type="email"
          @blur="validateEmail"
          @input="clearError('email')"
          placeholder="example@mail.com"
          :style="{
            width: '100%', padding: '8px', fontSize: '14px', marginTop: '4px',
            borderColor: errors.email ? '#f56c6c' : '#ddd',
            borderRadius: '4px',
          }"
        />
        <p v-if="errors.email" style="color: #f56c6c; font-size: 12px; margin: 4px 0 0;">{{ errors.email }}</p>
      </div>

      <!-- 密码 -->
      <div>
        <label style="font-weight: bold; font-size: 14px;">密码</label>
        <input
          v-model="password"
          type="password"
          @blur="validatePassword"
          @input="clearError('password')"
          placeholder="至少 6 个字符"
          :style="{
            width: '100%', padding: '8px', fontSize: '14px', marginTop: '4px',
            borderColor: errors.password ? '#f56c6c' : '#ddd',
            borderRadius: '4px',
          }"
        />
        <p v-if="errors.password" style="color: #f56c6c; font-size: 12px; margin: 4px 0 0;">{{ errors.password }}</p>
      </div>

      <!-- 确认密码 -->
      <div>
        <label style="font-weight: bold; font-size: 14px;">确认密码</label>
        <input
          v-model="confirmPassword"
          type="password"
          @blur="validateConfirmPassword"
          @input="clearError('confirmPassword')"
          placeholder="再次输入密码"
          :style="{
            width: '100%', padding: '8px', fontSize: '14px', marginTop: '4px',
            borderColor: errors.confirmPassword ? '#f56c6c' : '#ddd',
            borderRadius: '4px',
          }"
        />
        <p v-if="errors.confirmPassword" style="color: #f56c6c; font-size: 12px; margin: 4px 0 0;">{{ errors.confirmPassword }}</p>
      </div>

      <!-- 按钮 -->
      <div style="display: flex; gap: 8px;">
        <button type="submit" style="padding: 10px 24px; cursor: pointer; background: #409eff; color: white; border: none; border-radius: 4px; font-size: 14px;">注册</button>
        <button type="button" @click="resetForm" style="padding: 10px 24px; cursor: pointer; background: #909399; color: white; border: none; border-radius: 4px; font-size: 14px;">重置</button>
      </div>
    </form>

    <p style="color: #888; font-size: 13px; margin-top: 12px;">
      💡 失去焦点时验证，输入时清除错误，提交时全面检查
    </p>
  </div>
</template>
