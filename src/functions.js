import Big from 'big.js'  // Import big.js to fix floating point problem
import fetch from 'node-fetch' // Import fetch to perform REST GET calls

export function equals(arg1, arg2) {
  return arg1 == arg2 // Perform comparison and return result
}

export function not() {
  return arguments[0] ? false : true  // Perform not operation and return result
}

export function add(...params) {
  var big1 = new Big(params[0]) // Create a new Big object from 1st parameter
  var big2 = new Big(params[1]) // Create a new Big object from 2nd parameter
  return big1.add(big2).toNumber()  // Perform addition and return result
}

export function contains(...params) {
  return params[0].includes(params[1])  // Check if param[1] exists inside param[0] and return result
}

export async function fetchGet(url) {
  var requestOptions = {  // declare request options
    method: 'GET',
    redirect: 'follow',
  }
  try {
    let response = await fetch(url, requestOptions) // Make the GET request
    return await response.text()  // Get text response and return result
  } catch (e) {
    console.error(e)
    return null
  }
}
