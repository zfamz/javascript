import { create } from './create'
class Person {
  name: string
  constructor(name: string = 'js') {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}

describe('my create', () => {
  let person = new Person()
  let _person = Object.create(person)
  let p = create(person)
  let obj_null = create(null)
  let _obj_null = Object.create(null)

  it('test __proto__', () => {
    // @ts-ignore
    expect(person.__proto__).toBe(Person.prototype)
    expect(_person.__proto__).toBe(person)
    expect(p.__proto__).toBe(person)

    // console.log(obj_null, _obj_null)
    // null
    expect(Object.getPrototypeOf(obj_null)).toBeNull()
    // ! 直接访问__proto__ 属性是 undefined
    expect(obj_null.__proto__).toBeUndefined()
    expect(_obj_null.__proto__).toBeUndefined()
  })
})
