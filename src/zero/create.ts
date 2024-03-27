// 执行标准 https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.create
// 目的： 返回一个以参数为原型的新对象

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
