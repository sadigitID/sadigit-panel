<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-500 px-4">
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
      <!-- Logo -->
      <div class="flex justify-center">
        <img
          src="https://www.sadigit.co.id/wp-content/uploads/2022/05/just-logo-icon-1-1.png"
          alt="Logo"
          class="h-30 w-30 object-contain"
        />
      </div>

      <!-- Judul -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Login</h2>
      <p class="text-sm text-center text-gray-500 mb-6">Masuk ke akun Anda</p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="username123"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="••••••••"
            required
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-sm text-red-500 text-center">
          {{ errorMessage }}
        </p>

        <!-- Loading Info -->
        <p v-if="loading" class="text-sm text-center text-gray-400">
          Sedang login...
        </p>

        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          :disabled="loading"
        >
          Login
        </button>
      </form>

      <!-- Footer -->
      <p class="text-xs text-center text-gray-400 mt-6">
        &copy; 2025 PT. Sawarga Digital Indonesia
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/API'

const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await loginUser(username.value, password.value)

    if (result.token) {
      localStorage.setItem('token', result.token)
    }

    router.push('/')
  } catch (error: any) {
    console.error('Login gagal:', error?.response?.data || error.message)
    errorMessage.value = 'Username atau password salah. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

