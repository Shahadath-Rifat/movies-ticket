// Print
export function print(arg) {
    console.log(arg);
}
  
// Select HTML element
export function select(selector, parent = document) {
    return parent.querySelector(selector);
}