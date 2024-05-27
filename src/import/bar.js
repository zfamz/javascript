import { OBJ, VAR_NAME } from './lib'

export function log() {
  console.log('bar.js: ', OBJ, VAR_NAME)
}

export function change() {
  OBJ.name = 'bar'
}

export default {
  log,
  change,
}
