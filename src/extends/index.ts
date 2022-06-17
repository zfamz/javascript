export function Person(name: string) {
  this.name = name
}

export function Son(name: string, age: number) {
  Person.call(this, name)
  this.age = age
}
