export function Person(name: string) {
  this.name = name
  this.getName = function() {
    return this.name
  }
}

export function Son(name: string, age: number) {
  Person.call(this, name)
  this.age = age
}

// problem: 他们共享了属性，会相互影响
function Person_1() {
  this.color = ['#000']
}
function Son_1() { }
Son_1.prototype = new Person_1()

if (import.meta.vitest) {
  const son = new Son('degg', 18)
  const _son = new Son('degg_1', 18)
  it.fails('rebuild common function', () => {
    // 每次new 新的对象时，方法也重新创建了
    expect(son.getName).toEqual(_son.getName)
  })
  it('pure constructor', () => {
    const son = new Son_1()
    const son1 = new Son_1()
    expect(son1.color.length).toBe(1)
    son.color.push("#fff")
    expect(son1.color).toEqual(['#000', '#fff'])
    expect(son1.color.length).toBe(2)
  })
}
