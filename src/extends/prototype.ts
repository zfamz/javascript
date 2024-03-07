export function Person(name: string) {
  this.name = name
}
Person.prototype.getName = function () {
  return this.name
}

export function Son(name: string, age: number) {
  Person.call(this, name)
  this.age = age
}
// Son.prototype = new Person('person')
Son.prototype = Person.prototype
Son.prototype.constructor = Son
