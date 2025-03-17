<script setup lang="js">
import FilterComponent from './components/FilterComponent.vue'
import TableComponent from './components/TableComponent.vue'
import { onMounted } from 'vue'
import { fetchData } from '@/utils'

onMounted(async () => {
  await fetchData('https://jsonplaceholder.typicode.com/photos?_limit=30')
})
</script>

<template>
  <header>
    <div class="text-center text-2xl font-bold text-blue-500">
      Тестовое задание для компании Bambit
    </div>
    <FilterComponent />
  </header>

  <main>
    <TableComponent />
  </main>
</template>
