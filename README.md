# Mendix expression evaluator
This repo contains code to execute a custom AST(Abstract Syntax Tree) format.

## Development
To start, run `npm install`.

## Unit Tests
Run `npm run tests`

# Documentation
Mendix developers building apps can write short expressions in their apps. An expression can be as simple as `true` or more complex such as `1 + 1 != 3`.
These expressions are parsed and converted to an AST in JSON format. The documentation for the complete expression syntax can be found [here](https://docs.mendix.com/refguide/expressions). This repo contains a simple evaluator that can execute the AST for a very small subset of the Mendix expressions.

## AST Specification
The AST can contain different types of nodes. Type of a node is specified by the `type` field. An AST type can either be `literal` or `function`.

### Literal Expression
Literals represent constant values specified in an expression.

```javascript
{
    type: "literal",
    value: "test"
}
```

#### value
This field can hold a JavaScript string, boolean, number, Date, `null`, or an Array containing the same primitives. 

### Function Expression
Functions represent an operation that accept zero or more parameters and return a value.

```javascript
{
    type: "function",
    name: "function_name",
    parameters: [Expression1, Expression2, ...]
}
```

#### name
The operation to be performed on the parameters.

#### parameters
Zero or more sub-expression(s).

#### Return value
A function can return one of the following types: string, boolean, number, Date, `null`, or an Array containing the same primitives. 

## Examples
```javascript
// Expression: 40 + 2
// AST:
{
    type: "function",
    name: "add",
    parameters: [
        {
            type: "literal",
            value: 40
        },
        {
            type: "literal",
            value: 2
        }
    ]
}

// Expression: 1 + 2 != 3
// AST:
{
    type: "function",
    name: "not",
    parameters: [
        {
            type: "function",
            name: "equals",
            parameters: [
                {
                    type: "function",
                    name: "add",
                    parameters: [
                        {
                            type: "literal",
                            value: 1
                        },
                        {
                            type: "literal",
                            value: 2
                        },
                    ]
                },
                {
                    type: "literal",
                    value: 3
                }
            ]
        }
    ]
}
```

## The Implementation
This assignment contains an implementation of the specification above. The `functions.js` contains three functions:
* `equals` function that should return whether the two arguments passed to it are equal or not.
* `add` function that should return a sum of all passed arguments.
* `not` function that should return `false` if the input parameter is `true` or return `true` if the input parameter is `false`.

The `evaluator.js` contains the main component that evaluates an expression's AST.

## The Assignment

In this assignment, we ask you to improve the this implementation and adding some new functionality.

* This implementation is poorly done and we could use your help. The code in this assignment can ben improved in various ways. Please review the code and improve where you think it is necessary. Also consider extending the unit tests. We value not just functional improvements, but also the non-functional aspects such as quality, readability and extensibility. We expect you to return the assignment on a level that you consider "production-ready".
* Implement new functionality. Support evaluating the following expression: `contains(fetchGet("https://google.com"), "Bing")`.
  * A function called `fetchGet` which can retrieve the contents of a given URL with a GET call and return as string. 
  * A function called `contains` that accepts two string arguments and returns if the first argument contains the second argument.
  * After implementing the functions, the evaluator should able to evaluate the following AST:
```javascript
// contains(fetchGet("https://google.com"), "Bing")
{
  "type": "function",
  "name": "contains",
  "parameters": [
    {
      "type": "function",
      "name": "fetchGet",
      "parameters": [
        {
          "type": "literal",
          "value": "https://google.com"
        }
      ]
    },
    {
      "type": "literal",
      "value": "Bing"
    }
  ]
}
```

You can create a new bundle with `git bundle create assignment.bundle --all` command after you're done with the assignment. (Don't forget to commit your work first) and send it back.

Good luck!