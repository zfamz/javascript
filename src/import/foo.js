import { OBJ, VAR_NAME } from './lib'

export function log() {
  console.log('foo.js: ', OBJ, VAR_NAME)
}

export function change() {
  OBJ.name = 'Foo'
  // VAR_NAME = 'Foo'
}
