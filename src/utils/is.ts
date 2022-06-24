import { typeOf } from './typeOf'

const isType = (obj: unknown, type: string): boolean => typeOf(obj) === type
const isArray = (obj?: unknown): boolean => typeOf(obj) === 'array'
const isObject = (obj?: unknown): boolean => typeOf(obj) === 'object'

export {
  isType,
  isArray,
  isObject
}
