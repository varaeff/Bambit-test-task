import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDataStore = defineStore('data', () => {
  const strings = ref([])
  const isFetching = ref(false)
  const limit = ref(30)
  const albums = ref('')
  const sortedColumn = ref(-1)
  const columnNames = ref(['Ид', 'Альбом', 'Название', 'Ссылка', 'Миниатюра'])
  const searchString = computed(() => `https://jsonplaceholder.typicode.com/photos${albums.value}`)

  const setIsFetching = (value) => {
    isFetching.value = value
  }

  const setLimit = (value) => {
    limit.value = value
  }

  const setStrings = (value) => {
    strings.value = value
  }

  const addStrings = (value) => {
    strings.value.push(...value)
  }

  const setAlbums = (value) => {
    albums.value = value.length
      ? '?&' +
        value
          .split(' ')
          .map((album) => `albumId=${album}`)
          .join('&')
      : ''
  }

  const setSortedColumn = (value) => {
    sortedColumn.value = value
  }

  const fetchData = async (adding) => {
    console.log('Fetching data from:', searchString.value)
    setIsFetching(true)

    try {
      const response = await fetch(searchString.value)
      const strings = await response.json()
      adding ? addStrings(strings) : setStrings(strings)
    } catch (error) {
      return console.error(error)
    }

    setIsFetching(false)
  }

  const sortStrings = (value, up) => {
    setLimit(30)
    console.log('Sorting strings by:', value)
    if (['id', 'albumId'].includes(value)) {
      strings.value = strings.value.sort((a, b) => {
        return up ? a[value] - b[value] : b[value] - a[value]
      })
    } else {
      strings.value = strings.value.sort((a, b) => {
        return up ? a[value].length - b[value].length : b[value].length - a[value].length
      })
    }
  }

  return {
    strings,
    isFetching,
    limit,
    sortedColumn,
    columnNames,
    fetchData,
    setLimit,
    setAlbums,
    setSortedColumn,
    sortStrings,
  }
})
