<script setup lang="js">
import FilterComponent from './components/FilterComponent.vue'
import TableComponent from './components/TableComponent.vue'
import LoaderComponent from './components/LoaderComponent.vue'
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
    <div class="text-center text-2xl font-bold text-blue-500">
      Тестовое задание для компании Bambit
    </div>
    <FilterComponent :scrollTableUp="scrollTableUp" />
  </header>

  <main>
    <LoaderComponent v-if="dataStore.isFetching" />
    <TableComponent ref="tableRef" />
  </main>
</template>
