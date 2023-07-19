import { Evaluator } from '../src/evaluator'

let evaluator

describe('Evaluator', () => {
  // Test to evaluate literal expression = true. Made async.
  it('evaluates a literal boolean expression', async function () {
    expect(
      await evaluator.evaluate({ type: 'literal', value: 'true' }),
    ).toBeTruthy()
  })

  // Test to evaluate literal expression = 500.5. Made async.
  it('evaluates a literal decimal expression', async function () {
    expect(
      await evaluator.evaluate({ type: 'literal', value: 500.5 }),
    ).toBe(500.5)
  })

  // Fixed test to evaluate addition. Also made async.
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

  // Test to validate error thrown. Made async.
  it('throws an error for an invalid expression', async () => {
    await expect(async () => {
      await evaluator.evaluate({ type: '' })
    }).rejects.toThrow()
  })

  // Test to validate error thrown. Made async.
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

  // Test to check contains operation
  it('evaluates contains operation', async () => {
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

  // Test to check contains operation with GET call
  it('evaluates contains with a fetchGet function as a parameter', async () => {
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

  // Test to check not operation with contains and GET call
  it('evaluates a not operation with contains and fetchGet functions as parameters', async () => {
    expect(
      await evaluator.evaluate({
        type: 'function',
        name: 'not',
        parameters: [
          {
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
          },
        ],
      }),
    ).toBe(true)
  })

  // Test to check not operation
  it('evaluates a not operation', async () => {
    expect(
      await evaluator.evaluate({
        type: 'function',
        name: 'not',
        parameters: [{ type: 'literal', value: true }],
      }),
    ).toBeFalsy()
  })

  // Test to check contains operation with multiple GET calls
  it('evaluates a contains operation with multiple fetchGet functions as parameters', async () => {
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
