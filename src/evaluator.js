import { add, contains, equals, fetchGet, not } from './functions'

export class Evaluator {
  async evaluate(expression) {
    return new Promise(async (resolve, reject) => {
      try {
        let param1, param2
        if (expression.type == 'literal') {
          resolve(expression.value)
          return
        } else {
          switch (expression.name) {
            case 'add':
                param1 = await this.evaluate(expression.parameters[0]);
                param2 = await this.evaluate(expression.parameters[1]);
                resolve(add(param1, param2));
                break;
            case 'equals':
                param1 = await this.evaluate(expression.parameters[0]);
                param2 = await this.evaluate(expression.parameters[1]);
                resolve(equals(param1, param2));
                break;
            case 'not':
                resolve(not(expression.parameters[0]));
                break;
            case 'fetchGet':
                param1 = await this.evaluate(expression.parameters[0]);
                resolve(await fetchGet(param1));
                break;
            case 'contains':
                param1 = await this.evaluate(expression.parameters[0]);
                param2 = await this.evaluate(expression.parameters[1]);
                resolve(contains(param1, param2));
                break;
            default:
              reject(new Error('Unknown function'));
              break;
          }
        }
      }
      catch(e){
        reject(e);
      }
    })
  }
}
