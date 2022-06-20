export function Person(name: string) {
  this.name = name
}
Person.prototype.getName = function() {
  return this.name
}

export function Son(name: string, age: number) {
  Person.call(this, name)
  this.age = age
}

Son.prototype = Object.create(Person.prototype)
Son.prototype.constructor = Son

if (import.meta.vitest) {
  it('Standard', () => {
    const son = new Son('degg', 18)
    const person = new Person('person')
    expect(son.getName()).toEqual('degg')
    Son.prototype.getName = () => 'Error'
    const son1 = new Son('degg', 18)
    expect(son1.getName()).toEqual('Error')
    expect(person.getName()).toEqual('person')
  })
}
