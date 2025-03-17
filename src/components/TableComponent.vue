<script setup lang="js">
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()
</script>

<template>
  <div class="flex justify-center mt-4">
    <table class="table-auto w-[600px] max-h-[600px] overflow-y-auto">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2">Ид</th>
          <th class="border border-gray-300 p-2">Альбом</th>
          <th class="border border-gray-300 p-2">Название</th>
          <th class="border border-gray-300 p-2">Ссылка</th>
          <th class="border border-gray-300 p-2">Миниатюра</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="string in dataStore.strings" :key="string.id">
          <td class="border border-gray-300 p-2">{{ string.id }}</td>
          <td class="border border-gray-300 p-2">{{ string.albumId }}</td>
          <td class="border border-gray-300 p-2">{{ string.title }}</td>
          <td class="border border-gray-300 p-2">{{ string.url }}</td>
          <td class="border border-gray-300 p-2">
            <img :src="string.thumbnailUrl" alt="thumbnail" class="w-16 h-16 object-cover" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
