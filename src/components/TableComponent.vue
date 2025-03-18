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
    dataStore.setStartIndex(dataStore.startIndex + dataStore.limit)
    dataStore.setLimit(20)
    await dataStore.fetchData(true)
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

const sortTable = (column) => {
  dataStore.sortStrings(column)
}

defineExpose({ scrollUp })
</script>

<template>
  <div
    ref="tableContainer"
    class="w-[600px] max-h-[600px] overflow-y-auto border mx-auto mt-4"
    @scroll="handleScroll"
  >
    <table class="table-fixed w-full table-layout-fixed">
      <thead class="sticky top-0 bg-white shadow-md">
        <tr>
          <th
            class="border border-gray-300 p-2 w-[50px] hover:underline cursor-pointer"
            @click="sortTable('id')"
          >
            Ид
          </th>
          <th
            class="border border-gray-300 p-2 w-[80px] hover:underline cursor-pointer"
            @click="sortTable('albumId')"
          >
            Альбом
          </th>
          <th
            class="border border-gray-300 p-2 w-[160px] hover:underline cursor-pointer"
            @click="sortTable('title')"
          >
            Название
          </th>
          <th
            class="border border-gray-300 p-2 w-[160px] hover:underline cursor-pointer"
            @click="sortTable('url')"
          >
            Ссылка
          </th>
          <th
            class="border border-gray-300 p-2 hover:underline cursor-pointer"
            @click="sortTable('thumbnailUrl')"
          >
            Миниатюра
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="string in dataStore.strings" :key="string.id">
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
          <td class="border border-gray-300 p-2" @mouseenter="checkOverflow">
            {{ string.thumbnailUrl }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
