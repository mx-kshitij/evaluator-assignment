//todo: add unit tests
import Big from 'big.js'
const fetch = require('node-fetch')

export function equals(arg1, arg2) {
  return arg1 == arg2
}

export function not() {
  return arguments[0] ? false : true
}

export function add(...params) {
  var big1 = new Big(params[0])
  var big2 = new Big(params[1])
  return big1.add(big2).toNumber()
}

export function contains(...params) {
  return params[0].includes(params[1])
}

export async function fetchGet(url) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  try {
    let response = await fetch(url, requestOptions)
    return await response.text()
  } catch (e) {
    console.error(e)
    return null
  }
}
