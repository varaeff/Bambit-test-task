<script setup lang="js">
import { ref } from 'vue'
import { checkInput, fetchData } from '@/utils'

const search = ref('')
const handleClick = async () => {
  await fetchData('https://jsonplaceholder.typicode.com/photos?_limit=30')
}
</script>

<template>
  <div class="flex justify-center mt-4">
    <input
      type="text"
      class="border border-gray-300 p-2 w-[410px]"
      placeholder="Введите номера альбомов разделённые пробелами"
      v-model="search"
      @keyup="() => (search = checkInput(search))"
      @blur="() => (search = search.trim())"
    />
    <button class="bg-blue-500 text-white p-2 ml-2" @click="handleClick">Поиск</button>
  </div>
</template>
