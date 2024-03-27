export const obj = {
  val: 1,
  [Symbol.iterator]() {
    return {
      next() {
        return {
          value: obj.val++,
          done: obj.val > 10 ? true : false,
        }
      },
    }
  },
}
