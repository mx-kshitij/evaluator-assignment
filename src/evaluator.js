import { add, contains, equals, fetchGet, not } from './functions'

export class Evaluator {
  async evaluate(expression) {  //Made Asynchronous to support async fetchGet function
    return new Promise(async (resolve, reject) => {
      try {
        let param1, param2  //Declare param variables used multiple times
        if (expression.type == 'literal') {
          resolve(expression.value) // Resolve value
          return
        } else {
          switch (expression.name) { // Replaced if-else tree with switch case for faster execution and better readability
            case 'add':
              param1 = await this.evaluate(expression.parameters[0])  // Get 1st number to add
              param2 = await this.evaluate(expression.parameters[1])  // Get 2nd number to add
              resolve(add(param1, param2))  // Perform addition and resolve value
              break
            case 'equals':
              param1 = await this.evaluate(expression.parameters[0])  // Get 1st parameter to compare
              param2 = await this.evaluate(expression.parameters[1])  // Get 2nd parameter to compare
              resolve(equals(param1, param2)) // Perform comparison and resolve value
              break
            case 'not':
              param1 = await this.evaluate(expression.parameters[0])  // Evaluate 1st parameter
              resolve(not(param1))  // Perform not operation
              break
            case 'fetchGet':
              param1 = await this.evaluate(expression.parameters[0])  // Evaluate 1st parameter to get the endpoint
              resolve(await fetchGet(param1)) // Resolve response of GET request using fetchGet
              break
            case 'contains':
              param1 = await this.evaluate(expression.parameters[0])  // Get 1st parameter. This is the source string.
              param2 = await this.evaluate(expression.parameters[1])  // Get 2nd parameter. This is the string to be searched in source string (1st parmeter).
              resolve(contains(param1, param2)) // Perform contains operation and resolve result
              break
            default:
              reject(new Error('Unknown function')) // Replaced throw with reject to accomodate async behaviour. Throw error when function not known.
              break
          }
        }
      } catch (e) {
        console.error(e)  // Log errors if any
        reject(e) // Reject promise
      }
    })
  }
}
