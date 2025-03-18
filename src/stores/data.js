import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDataStore = defineStore('data', () => {
  const strings = ref([])
  const isFetching = ref(false)
  const limit = ref(30)
  const startIndex = ref(0)
  const albums = ref('')

  const setIsFetching = (value) => {
    isFetching.value = value
  }

  const setStartIndex = (value) => {
    startIndex.value = value
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
      ? '&' +
        value
          .split(' ')
          .map((album) => `albumId=${album}`)
          .join('&')
      : ''
  }

  const searchString = computed(
    () =>
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit.value}&_start=${startIndex.value}${albums.value}`,
  )

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

  const sortStrings = (value) => {
    console.log('Sorting strings by:', value)
    strings.value = strings.value.sort((a, b) => {
      if (a[value] < b[value]) return -1
      if (a[value] > b[value]) return 1
    })
  }

  return {
    strings,
    isFetching,
    startIndex,
    limit,
    fetchData,
    setLimit,
    setStartIndex,
    setAlbums,
    sortStrings,
  }
})
