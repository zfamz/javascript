import { isObject, isType } from '@utils/is'

export function deepClone(obj: any, hash = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj
  if (Array.isArray(obj)) {
    return obj.slice().map((item: any) => deepClone(item, hash))
  }

  if (hash.has(obj)) return hash.get(obj)
  if (isObject(obj)) {
    const result = {}
    hash.set(obj, result)
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key], hash);
      }
    }
    Object.getOwnPropertySymbols(obj).forEach(key => {
      result[key] = deepClone(obj[key], hash);
    })
    return result
  }
  if (isType(obj, 'date')) {
    return new Date(obj.getTime())
  }
  if (isType(obj, 'regexp')) {
    return new RegExp(obj.valueOf()) // obj.toString() is Error
  }
  // RegExp Date 类型可以这样处理
  return new obj.constructor(obj)
}

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
