<script setup lang="js">
import { useDataStore } from '@/stores/data'
import { onMounted } from 'vue'
import { ref } from 'vue'

const dataStore = useDataStore()
const tableContainer = ref(null)

onMounted(async () => {
  await dataStore.fetchData(false)
})

const handleScroll = async () => {
  let { scrollTop, scrollHeight, clientHeight } = tableContainer.value

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    scrollTop -= 10
    dataStore.setLimit(dataStore.limit + 20)
  }
}

const scrollUp = () => {
  if (tableContainer.value) {
    tableContainer.value.scrollTop = 0
  }
}

const checkOverflow = (e) => {
  if (e.target.scrollWidth > e.target.clientWidth) {
    e.target.setAttribute('title', e.target.textContent)
  } else {
    e.target.removeAttribute('title')
  }
}

const sortTable = (column, index) => {
  scrollUp()
  if (dataStore.sortedColumn === -1) {
    dataStore.columnNames[index] += ' ↑'
    dataStore.setSortedColumn(index)
    dataStore.sortStrings(column, true)
  } else if (dataStore.sortedColumn === index) {
    if (dataStore.columnNames[index].includes('↑')) {
      dataStore.columnNames[index] = dataStore.columnNames[index].replace('↑', '↓')
      dataStore.sortStrings(column, false)
    } else {
      dataStore.columnNames[index] = dataStore.columnNames[index].replace('↓', '↑')
      dataStore.sortStrings(column, true)
    }
  } else {
    dataStore.columnNames[dataStore.sortedColumn] = dataStore.columnNames[
      dataStore.sortedColumn
    ].slice(0, -2)
    dataStore.columnNames[index] += ' ↑'
    dataStore.setSortedColumn(index)
    dataStore.sortStrings(column, true)
  }
}

defineExpose({ scrollUp })
</script>

<template>
  <div
    ref="tableContainer"
    class="max-w-[600px] max-h-[600px] overflow-y-auto border mx-auto mt-4"
    @scroll="handleScroll"
  >
    <table class="table-fixed w-full table-layout-fixed">
      <thead class="sticky top-0 bg-gray-500 text-white shadow-md">
        <tr>
          <th
            class="border border-gray-300 p-2 w-11/120 hover:underline cursor-pointer"
            @click="sortTable('id', 0)"
          >
            {{ dataStore.columnNames[0] }}
          </th>
          <th
            class="border border-gray-300 p-2 w-19/120 hover:underline cursor-pointer"
            @click="sortTable('albumId', 1)"
          >
            {{ dataStore.columnNames[1] }}
          </th>
          <th
            class="border border-gray-300 p-2 w-1/4 hover:underline cursor-pointer"
            @click="sortTable('title', 2)"
          >
            {{ dataStore.columnNames[2] }}
          </th>
          <th
            class="border border-gray-300 p-2 w-1/4 hover:underline cursor-pointer"
            @click="sortTable('url', 3)"
          >
            {{ dataStore.columnNames[3] }}
          </th>
          <th
            class="border border-gray-300 p-2 hover:underline cursor-pointer"
            @click="sortTable('thumbnailUrl', 4)"
          >
            {{ dataStore.columnNames[4] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="string in dataStore.strings.slice(0, dataStore.limit)" :key="string.id">
          <td class="border border-gray-300 p-2 truncate" @mouseenter="checkOverflow">
            {{ string.id }}
          </td>
          <td class="border border-gray-300 p-2 truncate" @mouseenter="checkOverflow">
            {{ string.albumId }}
          </td>
          <td class="border border-gray-300 p-2 truncate" @mouseenter="checkOverflow">
            {{ string.title }}
          </td>
          <td class="border border-gray-300 p-2 truncate" @mouseenter="checkOverflow">
            {{ string.url }}
          </td>
          <td class="border border-gray-300 p-2 truncate" @mouseenter="checkOverflow">
            {{ string.thumbnailUrl }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
