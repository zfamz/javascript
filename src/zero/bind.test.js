Function.prototype.myBind = function (context) {
  const _that = context
  const fn = Symbol()
  context[fn] = this
  const args = [...arguments].slice(1)
  return function () {
    return context[fn](args.concat([...arguments]))
  }
}

const o = {
  _name: 'object',
}
const o1 = {
  _name: 'o1',
  say: function () {
    return this._name
  },
  getArgs: function (...args) {
    return [this._name, ...args].join(',')
  },
}

function func() {
  return this._name
}

describe('function bind', () => {
  it('return function', () => {
    expect(typeof func.bind(o1)).toBe('function')
    expect(typeof func.myBind(o1)).toBe('function')
  })

  it('change this', () => {
    expect(o1.say.bind(o)()).toBe(o._name)
    expect(o1.say.myBind(o)()).toBe(o._name)
    expect(func.bind(o1)()).toBe(o1._name)
    expect(func.myBind(o1)()).toBe(o1._name)
  })

  it('arguments', () => {
    const args = [1, 'string']
    const result = [o1._name, ...args].join(',')
    expect(o1.getArgs.bind(o1, ...args)()).toBe(result)
    expect(o1.getArgs.myBind(o1, ...args)()).toBe(result)
    expect(o1.getArgs.bind(o1, args[0])(args[1])).toBe(result)
    expect(o1.getArgs.myBind(o1, args[0])(args[1])).toBe(result)
  })
})
