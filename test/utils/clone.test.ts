// https://muyiy.cn/blog/4/4.3.html
import { shallowClone, _shallowClone, deepClone } from '@utils/clone'

describe('Deep Clone', () => {
  it('base type', () => {
    const obj = { a: 'string', b: 1, c: true, d: null, f: undefined, s: Symbol(1) }
    const newObj = deepClone(obj)

    // 1. 是一个新的对象
    expect(newObj).not.toBe(obj)
    // 2. 基础属性直接赋值, Symbol是基础类型
    expect(newObj).toStrictEqual(obj)
  })
  it('Point Type', () => {
    const symbol = Symbol('apple')
    const obj = {
      object: { name: 'degg' },
      arr: [1, 'str', { name: 'ObjInArr' }],
      date: new Date(),
      reg: /^reg/g,
      symbol,
      [symbol]: 'Symbol key',
      loop: { name: 'loopObj', self: null },
      func: function name() { return 'function' }
    }
    obj.loop.self = obj.loop
    const newObj = deepClone(obj)

    // 对象是不同的引用
    expect(newObj).not.toBe(obj)
    // Array
    obj.arr[0] = 'changed'
    expect(newObj.arr).not.toBe(obj.arr)
    // Object
    obj.object.name = 'changed'
    expect(newObj.object).not.toBe(obj.object)
    // Date
    expect(newObj.date.getTime()).toBe(obj.date.getTime())
    // RegExp
    expect(newObj.reg.toString()).toBe(obj.reg.toString())
    // 循环引用
    expect(newObj.loop).toBe(newObj.loop.self)
    // Symbol key
    expect(newObj[symbol]).toBe(obj[symbol])
    // function 直接返回
  })
})

describe('Shallow Clone', () => {
  it('base type', () => {
    const obj = { a: 'string', b: 1, c: true, d: null, f: undefined, s: Symbol(1) }
    const newObj = shallowClone(obj)

    // 1. 是一个新的对象
    expect(newObj).not.toBe(obj)
    expect(newObj.s).toBe(obj.s)
    // 2. 基础属性直接赋值
    expect(newObj).toStrictEqual(obj)
  })
  it('problem', () => {
    // 引用类型指向同一个对象，相互影响
    const obj = { a: function name() { return 'function' }, b: { name: 'degg' }, c: [1, 2, 3], d: new Date() }
    const newObj = shallowClone(obj)

    // 是同一个引用
    expect(newObj.c).toBe(obj.c)
    // 对象或数组里的属性直接共享
    expect(newObj).toStrictEqual(obj)
    obj.b.name = 'new'
    expect(newObj.b.name).not.toBe('degg')
    obj.c[1] = 100
    expect(newObj.c[1]).toBe(100)
    // 对属性重新赋值无影响
    obj.a = function() { return 'new' }
    expect(newObj.a()).toBe('function')
  })
})
