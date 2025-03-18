<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition duration-300"
  >
    <span v-if="isDark" class="text-yellow-400">🌙</span>
    <span v-else class="text-blue-500">☀️</span>
  </button>
</template>
