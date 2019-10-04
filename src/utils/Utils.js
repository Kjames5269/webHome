/*eslint-env node*/

import { KEY_TAB } from "keycode-js";

const isProduction = () => process.env.NODE_ENV == "production";

//  arr: Array of elements,
//  onDuplicate: fn(ele) what gets called when a duplicate is encountered
const hasDuplicates = (arr, onDuplicate) => {
  const dups = {};
  let containsDups = false;
  arr.forEach(e => {
    if (dups[e]) {
      onDuplicate(e);
      containsDups = true;
    }
    dups[e] = e;
  });
  return containsDups;
};

//  arr: an Array of objects / strings
//  selector: a function to extract strings from the objects
const findCommonStrs = (arr, selector) => {
  let firstWord = selector(arr[0]);
  let commonString = "";
  let charLocal;

  for (let i = 0; i < firstWord.length; i++) {
    charLocal = firstWord.charAt(i);
    for (let j = 1; j < arr.length; j++) {
      if (charLocal != selector(arr[j]).charAt(i)) {
        return commonString;
      }
    }
    commonString += charLocal;
  }
  return commonString;
};

export { isProduction, hasDuplicates, findCommonStrs };
