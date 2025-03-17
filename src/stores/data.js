import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    strings: [],
  }),
  actions: {
    setStrings(data) {
      this.strings = data
    },
    addString(string) {
      this.strings.push(string)
    },
    clearStrings() {
      this.strings = []
    },
  },
})
