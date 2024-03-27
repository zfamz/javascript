export function Person(name, age) {
  this.name = name || 'js'
  this.age = age || Math.floor(Math.random() * 100)
}

export function PersonWithReturn(name = 'ret', age) {
  Person.call(this, name, age)
  return { name }
}

Person.prototype.say = function () {
  console.log(`${this.name} : ${this.age}`)
}
PersonWithReturn.prototype.say = function () {
  console.log(`${this.name} : ${this.age}`)
}
//  link: https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-new-operator
export function myNew() {
  // es3
  // const args = Array.prototype.slice.call(arguments)

  const args = [...arguments]
  const fn = args.shift()

  const obj = Object.create(fn.prototype)
  let res = fn.apply(obj, args)
  return typeof res === 'object' ? res : obj
}
