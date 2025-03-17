import { useDataStore } from '@/stores/data'

export function checkInput(input) {
  if (input.endsWith(' '))
    return (
      input
        .split(' ')
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(' ') + ' '
    )

  return input
    .split('')
    .filter((char) => '0123456789 '.includes(char))
    .join('')
    .replace(/\s+/g, ' ')
}

export async function fetchData(url) {
  const dataStore = useDataStore()
  console.log('Fetching data from:', url)

  try {
    const response = await fetch(url)
    const strings = await response.json()
    dataStore.setStrings(strings)
    console.log('Data fetched:', dataStore.strings.value)
  } catch (error) {
    return console.error(error)
  }
}
