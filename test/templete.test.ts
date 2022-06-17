describe('clear test', (ctx) => {
  it.only('close', ok)
})

describe('mocking', () => {
  describe('Function', () => {
    const getLatest = (index: number = message.items.length - 1) => message.items[index]
    const message = {
      items: [{ id: 1, message: 'apple', from: 'tree' }, { id: 2, message: 'banana', from: 'soil' }],
      getLatest,
    }
    const result = message.items[message.items.length - 1]
    afterEach(() => {
      vi.restoreAllMocks()
    })
    it('should get the latest message with a spy', () => {
      const spy = vi.spyOn(message, 'getLatest')
      expect(spy.getMockName()).toEqual('getLatest')
      expect(message.getLatest()).toEqual(result)
      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockImplementationOnce(() => 'mocking data')
      expect(message.getLatest()).toEqual('mocking data')
      expect(spy).toHaveBeenCalledTimes(2)
    })
    it('should get with a mock', () => {
      const mock = vi.fn().mockImplementation(getLatest)
      expect(mock()).toEqual(result)
      expect(mock).toHaveBeenCalledTimes(1)
      mock.mockImplementationOnce(() => 'mocked function')
      expect(mock()).toEqual('mocked function')
      expect(mock).toHaveBeenCalledTimes(2)
      expect(mock()).toEqual(result)
      expect(mock).toHaveBeenCalledTimes(3)
    })
  })
  describe('date', () => {
    const purchase = () => {
      const currentHour = new Date().getHours()
      const [open, close] = [9, 17]
      if (currentHour > open && currentHour < close) {
        return { message: 'Success' }
      }
      return { message: 'Error' }
    }
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })
    it('allows hours', () => {
      const date = new Date(2000, 1, 1, 13)
      vi.setSystemTime(date)
      expect(purchase()).toEqual({ message: 'Success' })
    })
    it('disallows hours', () => {
      const date = new Date(2000, 1, 1, 8)
      vi.setSystemTime(date)
      expect(purchase()).toEqual({ message: 'Error' })
    })
  })
})

describe('Snapshots', () => {
  it('matches snapshot', () => {
    const data = { foo: new Set(['bar', 'snapshot']) }
    expect(data).toMatchSnapshot()
  })
  it('matches inline snapshot', () => {
    const data = { foo: new Set(['inline', 'snapshot']) }
    // 缩进也要匹配
    expect(data).toMatchInlineSnapshot(`
      {
        "foo": Set {
          "inline",
          "snapshot",
        },
      }
    `)
  })
})

describe('Filtering', () => {
  it('Filtering', () => {
    expect(true).toBeTruthy()
  })
  it.skip('skip test', fail)
  // it.only('only test', () => ok(getStatus()))
  it('only test', () => ok)
  // it.todo('unimplemented suite')
})

describe('test template', () => {
  it('serial test', () => {
    expect(1 + 2).toBe(3)
  })
})


const fail = () => {
  assert.equal(true, false)
}
const ok = (value: any = true) => {
  expect(value).toBeTruthy()
}

