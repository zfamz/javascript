import { includes } from './includes'

export function unique<T>(arr: T[]): T[] {
  const result = []
  arr.forEach(val => {
    !includes(result, val) && result.push(val)
  })
  return result
  // return [...new Set(arr)]
}
