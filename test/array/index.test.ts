import { includes } from '@arr/includes'
import { unique } from '@arr/unique'
import { flatten } from '@arr/flatten'


describe('flatten', () => {
  it('test', () => {
    expect(flatten([1, 3, [5, { name: 'degg' }]])).toEqual([1, 3, 5, { name: 'degg' }])
    expect(flatten([1, ['2-1', [['3-1', '3-2'], '2-3', [5, { name: 'degg' }]]]]))
      .toEqual([1, '2-1', '3-1', '3-2', '2-3', 5, { name: 'degg' }])
  })
})

describe('include', () => {
  it('test', () => {
    expect(includes([1, 3, 5], 1)).toEqual(true)
    expect(includes(['1', 3, 5], 1)).toEqual(false)
    expect(includes([1, 3, 5], 2)).toEqual(false)
  })
})

describe('unique', () => {
  it('test', () => {
    expect(unique([1, 2, 3, 4, 3, 2, 1]).join()).toMatchInlineSnapshot('"1,2,3,4"')
    expect(unique(['apple', 'apple', 1, 1, '1']).join()).toMatchInlineSnapshot('"apple,1,1"')
  })
})
