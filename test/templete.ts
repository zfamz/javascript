export function add(a: number, b: number): number {
  return a + b
}

if (import.meta.vitest) {
  it('add', () => {
    assert.equal(add(1, 2), 3)
    expect(add(0.1, 0.2)).toBeCloseTo(0.3)
  })
}
