Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw 'must be call by function'
  }
  // this 可以是基础值。null 或 undefined 直接用全局对像 window
  // context = context ? Object(context) : window
  const fn = Symbol()
  // this 指向处理
  context[fn] = this
  // 多于参数处理
  const args = [...arguments].slice(1)
  const res = context[fn](...args)
  delete context[fn]
  // 返回值处理
  return res
}
let _name = 'window'
const o1 = {
  _name: 'O1',
}

class C1 {
  constructor(name = 'C1') {
    this._name = name
  }
  say(flag, ...args) {
    if (flag) {
      return args
    }
    return this._name
  }
}
const c1 = new C1()
const c1_o1 = {
  _name: 'object',
  say: (flag, ...args) => {
    if (flag) {
      return args
    }
    return this._name
  },
}

function func() {
  return this._name
}

describe('mycall', () => {
  it('function', () => {
    expect(func.call(o1)).toBe('O1')
    expect(func.myCall(o1)).toBe('O1')
  })
  it('objct function: this', () => {
    expect(c1.say()).toBe('C1')
    expect(c1.say.call(o1)).toBe('O1')
    expect(c1.say.myCall(o1)).toBe('O1')
  })

  it('objct function: args', () => {
    expect(c1.say.call(o1, true, 2, 3)).toEqual([2, 3])
    expect(c1.say.myCall(o1, true, 2, 3)).toEqual([2, 3])
  })
})

Function.prototype.myApply = function (context, args) {
  if (args && !Array.isArray(args)) {
    throw 'CreateListFromArrayLike called on non-object'
  }
  context = context ? Object(context) : window

  const fn = Symbol()
  context[fn] = this

  const res = !args ? context[fn]() : context[fn](...args)

  delete context[fn]
  return res
}

describe('test apply', () => {
  it('function', () => {
    expect(func.apply(o1)).toBe('O1')
    expect(func.myApply(o1)).toBe('O1')
  })
  it('objct function: this', () => {
    expect(c1.say.apply(o1)).toBe('O1')
    expect(c1.say.myApply(o1)).toBe('O1')
  })

  it('objct function: args', () => {
    expect(c1.say.apply(o1, [true, 2, 3])).toEqual([2, 3])
    expect(c1.say.myApply(o1, [true, 2, 3])).toEqual([2, 3])
  })
})
