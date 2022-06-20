export class Person {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

export class Son extends Person {
  age: number
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }
}
