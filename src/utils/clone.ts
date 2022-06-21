// import { isArray, isObject } from '@utils/is'

export function shallowClone<T extends object>(obj: T): T {
  const result = {} as T
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result
}

export function _shallowClone(obj: object) {
  return Object.assign({}, obj)
}
