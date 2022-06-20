import { Person, Son } from "./standard";

describe("Extends", () => {
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



describe.skip('Obj and function relation', () => {
  it('proto chain', () => {
    let obj = {}
    function func() { }
    expect(func.prototype).toEqual({})
    // expect(obj.prototype).toBeUndefined()
    // expect(obj.__proto__.__proto__).toBeNull()
    // expect(obj.__proto__).toStrictEqual(obj.constructor.prototype)
    expect(obj.constructor).toStrictEqual(Object)
    expect(func.prototype.__proto__.__proto__).toBeNull()
  })
})

