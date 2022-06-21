export function includes<T>(arr: T[], value: T) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true
    }
  }
  return false
}
