<script setup lang="js">
import { ref } from 'vue'
import { checkInput } from '@/utils'
import { useDataStore } from '@/stores/data'
import { defineProps } from 'vue'

const props = defineProps(['scrollTableUp'])
const dataStore = useDataStore()

const search = ref('')
const handleClick = async () => {
  search.value = checkInput(search.value.trim())
  dataStore.setAlbums(search.value)
  dataStore.setStartIndex(0)
  dataStore.setLimit(30)
  props.scrollTableUp()
  await dataStore.fetchData(false)
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
      @keydown.enter="handleClick"
    />
    <button
      class="bg-blue-500 text-white p-2 ml-2 rounded hover:shadow-lg hover:shadow-blue-600/50 cursor-pointer active:shadow-none transition-shadow duration-100"
      @click="handleClick"
    >
      Поиск
    </button>
  </div>
</template>
