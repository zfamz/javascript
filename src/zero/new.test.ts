import { Person, PersonWithReturn, myNew } from './new'

const p1 = new Person('default', 18)
const p_1 = myNew(Person, 'myNew', 18)
const p2 = new PersonWithReturn()
const p_2 = myNew(PersonWithReturn)

describe('myNew', () => {
  it('基本属性', () => {
    expect(p_1.name).toBe('myNew')
    expect(p_1.age).toBe(18)
  })

  it('原型上的方法', () => {
    p_1.say()
    expect(p1.say).toBe(p_1.say)

    expect(p2.say).toBeUndefined()
    expect(p_2.say).toBeUndefined()
  })
})
