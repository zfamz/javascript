import { Person, Son } from './standard'

describe('Extends', () => {
  const son = new Son('degg', 18)
  const son1 = new Son('degg_1', 20)
  const person = new Person('person')

  it('base', () => {
    // attribute
    expect(son.name).toEqual('degg')
    // function
    expect(son.getName()).toEqual('degg')
  })

  it('Standard', () => {
    // 方法是否重新创建了
    expect(son.getName).toEqual(son1.getName)
    // 构造函数指向是否正确
    expect(son.constructor).toStrictEqual(Son)
    // 原型链判断
    expect(son.__proto__).toBeInstanceOf(Person)
    // 等于的时候，修改Son 的原型会影响到Person
    // expect(Object.getPrototypeOf(son)).not.toEqual(Person.prototype)
    // 修改原型属性，判断是否被影响了
    expect(son.getName()).toEqual('degg')
    Son.prototype.getName = () => 'Error'
    expect(son1.getName()).toEqual('Error')
    expect(person.getName()).toEqual('person')
  })
})

describe.only('Obj and function relation', () => {
  let obj: any = {}
  function Bar() {}
  let bar = new Bar()

  it('只有函数有prototype属性，对象没有', () => {
    expect(bar.prototype).toBeUndefined()
    expect(Bar.prototype.constructor).toBe(Bar)
  })

  it('prototype 和 constructor 的关系', () => {
    expect(Bar.prototype).toBe(bar.__proto__)
    expect(Bar.prototype.constructor).toBe(Bar)
  })

  it('原型链', () => {
    expect(bar.__proto__).toBe(Bar.prototype)

    // Bar 和 默认对象的关系
    expect(Object.prototype).toBe(Bar.prototype.__proto__)
    expect(obj.__proto__).toBe(bar.__proto__.__proto__)

    // 原始 null. typeof null :  object
    expect(Object.prototype).toBe(obj.__proto__)
    expect(obj.__proto__.__proto__).toBeNull()

    // 函数的__proto__ 最好都指向 Function.prototype
    // @ts-ignore
    expect(Bar.__proto__).toBe(Function.prototype)
    // Function.prototype.__proto__ 指向 Object.prototype
    // @ts-ignore
    expect(Function.prototype.__proto__).toBe(Object.prototype)
  })
})
