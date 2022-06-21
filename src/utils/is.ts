import { typeOf } from './typeOf'

const isArray = (obj?: unknown): boolean => typeOf(obj) === 'array'

export {
  isArray
}
