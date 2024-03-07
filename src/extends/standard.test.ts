import { Person, Son } from './standard'

it('Standard', () => {
  const son = new Son('degg', 18)
  const person = new Person('person')
  expect(son.getName()).toEqual('degg')
  Son.prototype.getName = () => 'Error'
  const son1 = new Son('degg', 18)
  expect(son1.getName()).toEqual('Error')
  expect(person.getName()).toEqual('person')
})
