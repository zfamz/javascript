import { obj } from './iterator'

describe('iterator impl', () => {
  it('for of ', () => {
    let _val = 1
    for (const value of obj) {
      // console.log('🚀 ~ it ~ value:', value)
      expect(value).toEqual(_val++)
    }
  })

  it('next', () => {
    const arr = [1, 2, 3, 4, 5]
    const itr = arr[Symbol.iterator]()
    expect(itr.next()).toEqual({ value: 1, done: false })
    expect(itr.next()).toEqual({ value: 2, done: false })
    expect(itr.next()).toEqual({ value: 3, done: false })
    expect(itr.next()).toEqual({ value: 4, done: false })
    expect(itr.next()).toEqual({ value: 5, done: false })
    expect(itr.next()).toEqual({ value: undefined, done: true })
    expect(itr.next()).toEqual({ value: undefined, done: true })
  })
})
