import { Person, Son } from "./index";

it.only('test', () => {
  // Son has Person atter
  let ins = new Son('degg', 18)
  expect(ins).toEqual({ name: 'degg', age: 18 })
})
