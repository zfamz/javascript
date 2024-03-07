import { Person, Son } from './prototype'

it.fails('problem', () => {
  const son = new Son('degg', 18)
  const person = new Person('person')
  son.__proto__.getName = () => 'Error'
  expect(person.getName()).toEqual('person')
})
