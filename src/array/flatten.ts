import { isArray } from '@utils/is'

export function flatten(arr: any[]): any[] {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (isArray(item)) {
      result = result.concat(flatten(item))
    } else {
      result.push(item)
    }
  }
  return result
}

export function flattenByReduce(arr: any[]): any[] {
  return arr.reduce((acc, val) => {
    if (isArray(val)) {
      acc = acc.concat(flattenByReduce(val))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

export function _flatten<T>(arr: T[]): FlatArray<T, number>[] {
  return arr.flat(10)
}
