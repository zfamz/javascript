import { typeOf } from '@utils/typeOf'
import { isArray } from '@utils/is'


describe('Utils is', () => {
  it("isArray", () => {
    expect(isArray([])).toEqual(true)
    expect(isArray()).toEqual(false)
    expect(isArray({ name: 'degg' })).toEqual(false)
  })
})

describe('Utils typeof', () => {
  it("typeof", () => {
    expect(typeOf([])).toEqual('array')  // '[object Array]'
    expect(typeOf({})).toEqual('object')
    expect(typeOf('string')).toEqual('string')
    expect(typeOf(123)).toEqual('number')
    expect(typeOf(new Date())).toEqual('date')
    expect(typeOf(/regexp/gi)).toEqual('regexp')
    expect(typeOf(Symbol(1))).toEqual('symbol')
  })
})
