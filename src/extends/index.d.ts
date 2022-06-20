interface IPerson {
  name: string;
  getName: () => string
}

interface ISon extends IPerson {
  age: number;
  getAge?: () => number
}
