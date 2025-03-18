export function checkInput(input) {
  if (input.endsWith(' '))
    return input
      .split(' ')
      .filter((value, index, self) => self.indexOf(value) === index)
      .join(' ')

  return input
    .split('')
    .filter((char) => '0123456789 '.includes(char))
    .join('')
    .replace(/\s+/g, ' ')
}
