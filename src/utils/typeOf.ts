export function typeOf(obj: unknown): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

if (import.meta.vitest) {
  it("Utils typeof", () => {
    expect(typeOf([])).toEqual('array')  // '[object Array]'
    expect(typeOf({})).toEqual('object')
    expect(typeOf('string')).toEqual('string')
    expect(typeOf(123)).toEqual('number')
    expect(typeOf(new Date())).toEqual('date')
    expect(typeOf(/regexp/gi)).toEqual('regexp')
    expect(typeOf(Symbol(1))).toEqual('symbol')
  })
}
