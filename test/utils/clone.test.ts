import { shallowClone, _shallowClone } from '@utils/clone'

describe('Deep Clone', () => {
  it('base type', () => {
    const obj = { a: 'string', b: 1, c: true, d: null, f: undefined }
    const newObj = shallowClone(obj)

    // 1. 是一个新的对象
    expect(newObj).not.toBe(obj)
    // 2. 基础属性直接赋值
    expect(newObj).toStrictEqual(obj)
  })
  it('Point Type', () => {
    const obj = { a: function name() { return 'function' }, b: { name: 'degg' }, c: [1, 2, 3], d: new Date() }
    const newObj = shallowClone(obj)

    // 对象是不同的引用
    // Array
    // Object
    // function
    // Date
    // Symbol
    // 循环引用
  })
})

describe('Shallow Clone', () => {
  it('base type', () => {
    const obj = { a: 'string', b: 1, c: true, d: null, f: undefined }
    const newObj = shallowClone(obj)

    // 1. 是一个新的对象
    expect(newObj).not.toBe(obj)
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
