<script setup lang="js">
import FilterComponent from './components/FilterComponent.vue'
import TableComponent from './components/TableComponent.vue'
import LoaderComponent from './components/LoaderComponent.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useDataStore } from '@/stores/data'
import { ref } from 'vue'

const dataStore = useDataStore()
const tableRef = ref(null)

const scrollTableUp = () => {
  if (tableRef.value) {
    tableRef.value.scrollUp()
  }
}
</script>

<template>
  <header>
    <div
      class="p-4 flex flex-col items-center text-black dark:bg-gray-900 dark:text-gray-300 sm:absolute sm:top-0 sm:right-0 sm:rounded-bl-lg w-full sm:w-auto text-center"
    >
      <ThemeToggle />
    </div>
    <div class="text-center text-2xl font-bold text-gray-500">
      Тестовое задание для компании Bambit
    </div>
    <FilterComponent :scrollTableUp="scrollTableUp" />
  </header>

  <main>
    <TableComponent ref="tableRef" />
    <LoaderComponent v-if="dataStore.isFetching" />
  </main>
</template>
