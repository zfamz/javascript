import { typeOf } from './typeOf'

const isArray = (obj?: unknown): boolean => typeOf(obj) === 'array'
const isObject = (obj?: unknown): boolean => typeOf(obj) === 'object'

export {
  isArray,
  isObject
}
