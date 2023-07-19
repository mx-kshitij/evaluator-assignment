import { Evaluator } from '../src/evaluator'

let evaluator

describe('Evaluator', () => {
  it('evaluates a literal expression', async function () {
    expect(
      await evaluator.evaluate({ type: 'literal', value: 'true' }),
    ).toBeTruthy()
  })

  it('evaluates a literal expression', async function () {
    expect(
      await evaluator.evaluate({ type: 'literal', value: null }),
    ).toBeFalsy()
  })

  it('evaluates a function expression', async () => {
    expect(
      await evaluator.evaluate({
        type: 'function',
        name: 'add',
        parameters: [
          { type: 'literal', value: 20.3 },
          { type: 'literal', value: 0.65 },
        ],
      }),
    ).toBe(20.95)
  })

  it('throws an error for an invalid expression', async () => {
    await expect(async () => {
      await evaluator.evaluate({ type: '' })
    }).rejects.toThrow()
  })

  it('throws an error for an invalid function expression', () => {
    expect(
      async () =>
        await evaluator.evaluate({
          type: 'function',
          name: 'toString',
          parameters: [],
        }),
    ).rejects.toThrow('Unknown function')
  })

  it('check contains', async () => {
    expect(
      await evaluator.evaluate({
        type: 'function',
        name: 'contains',
        parameters: [
          { type: 'literal', value: 'Ice cream is the best' },
          { type: 'literal', value: 'da' },
        ],
      }),
    ).toBe(false)
  })

  it('check bing in google', async () => {
    expect(
      await evaluator.evaluate({
        type: 'function',
        name: 'contains',
        parameters: [
          {
            type: 'function',
            name: 'fetchGet',
            parameters: [{ type: 'literal', value: 'https://google.com' }],
          },
          { type: 'literal', value: 'Bing' },
        ],
      }),
    ).toBe(false)
  })

  it('check api response in another api response', async () => {
    expect(
      await evaluator.evaluate({
        type: 'function',
        name: 'contains',
        parameters: [
          {
            type: 'function',
            name: 'fetchGet',
            parameters: [{ type: 'literal', value: 'https://google.com' }],
          },
          {
            type: 'function',
            name: 'fetchGet',
            parameters: [
              {
                type: 'literal',
                value:
                  'https://run.mocky.io/v3/3453a700-38a9-4da8-9088-eeda43d6dd68',
              },
            ],
          },
        ],
      }),
    ).toBe(false)
  })

  afterAll(() => {
    evaluator = null
  })

  beforeEach(() => {
    evaluator = new Evaluator()
  })
})
