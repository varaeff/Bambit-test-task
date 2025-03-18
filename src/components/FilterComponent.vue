<script setup lang="js">
import { ref } from 'vue'
import { checkInput } from '@/utils'
import { useDataStore } from '@/stores/data'

const props = defineProps(['scrollTableUp'])
const dataStore = useDataStore()
const search = ref('')

const handleFocus = () => {
  search.value = localStorage.getItem('search') || ''
}

const handleClick = async () => {
  search.value = checkInput(search.value.trim())
  localStorage.setItem('search', search.value)
  dataStore.setAlbums(search.value)
  dataStore.setLimit(30)
  props.scrollTableUp()
  if (dataStore.sortedColumn !== -1) {
    dataStore.columnNames[dataStore.sortedColumn] = dataStore.columnNames[
      dataStore.sortedColumn
    ].slice(0, -2)
    dataStore.setSortedColumn(-1)
  }
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
      @focus="handleFocus"
    />
    <button
      class="bg-gray-500 text-white p-2 ml-2 rounded hover:shadow-lg hover:shadow-gray-600/50 cursor-pointer active:shadow-none transition-shadow duration-100"
      @click="handleClick"
    >
      Поиск
    </button>
  </div>
</template>
