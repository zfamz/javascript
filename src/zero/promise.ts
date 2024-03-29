// https://dennisgo.cn/Articles/JavaScript/Promise.html
// https://www.zhihu.com/tardis/zm/art/144058361?source_id=1003
enum State {
  PENDING,
  FULFILLED,
  REJECTED,
}

export function MyPromise(func: Function) {
  const that = this
  that.state = State.PENDING
  that.value = null
  that.reason = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  function resolve(value: any) {
    if (that.state === State.PENDING) {
      that.state = State.FULFILLED
      that.value = value
      that.resolvedCallbacks.forEach((fn) => {
        fn(that.value)
      })
    }
  }
  function reject(value: any) {
    if (that.state === State.PENDING) {
      that.state = State.REJECTED
      that.reason = value
      that.rejectedCallbacks.forEach((fn) => {
        fn(that.reason)
      })
    }
  }

  try {
    func(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
const isFunction = (func: any) => typeof func === 'function'
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this

  if (!isFunction(onFulfilled)) {
    onFulfilled = (value) => value
  }
  if (!isFunction(onRejected)) {
    onRejected = (reason) => {
      throw reason
    }
  }

  let promise2 = new MyPromise((resolve, reject) => {
    if (that.state === State.FULFILLED) {
      queueMicrotask(() => {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
    if (that.state === State.REJECTED) {
      queueMicrotask(() => {
        try {
          let x = onRejected(that.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }

    if (that.state === State.PENDING) {
      that.resolvedCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(that.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      that.rejectedCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            let x = onRejected(that.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
  })
  return promise2
}

function resolvePromise(promise, x, resolve, reject) {
  // 1. promise 和 x 相等
  if (promise === x) {
    return reject(new TypeError('Chaining Cycle'))
  }
  // 2. x 是 promise
  if (x instanceof MyPromise) {
    // x 处于的3个状态判断
    // @ts-ignore
    x.then((y) => {
      resolvePromise(promise, y, resolve, reject)
    }, reject)
    // 3. x 是对象或函数
  } else if ((x !== null && typeof x === 'object') || isFunction(x)) {
    let called = false
    try {
      let then = x.then
      if (isFunction(then)) {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          (error) => {
            if (called) return
            called = true
            reject(error)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

export default MyPromise
