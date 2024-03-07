export function create(proto: any) {
  if (typeof proto !== 'object') {
    throw new TypeError('Object prototype may only be an Object or null')
  }
  function F() {}
  F.prototype = proto
  const obj = new F()
  if (proto === null) {
    obj.__proto__ = null
  }
  return obj
}
