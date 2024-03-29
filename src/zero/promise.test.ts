import MyPromise from './promise'

let tmp = new MyPromise((resolve, reject) => {
  resolve(1)
}).then((res) => {
  return res
})

describe('promise', () => {
  it('base grammer', () => {
    new MyPromise((resolve, reject) => {
      resolve(1)
    }).then((res) => {
      expect(res).toBe(1)
    })
    new MyPromise((resolve, reject) => {
      reject(1)
    }).then(null, (res) => {
      expect(res).toBe(1)
    })
  })

  it('async', () => {
    let result = 'timeout'
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(result)
      }, 0)
    }).then((res) => {
      // console.log(result)
      expect(res).toBe(result)
    })
  })

  it('then', async () => {
    let _pr
    let result = 'then'
    let p = new MyPromise((resolve, reject) => {
      resolve(result)
    })
    expect(p).instanceof(MyPromise)
    expect(p.then()).instanceof(MyPromise)
    p.then(1)
      .then('string')
      .then((res) => {
        console.log(res, '=====', result)
      })
  })
})
