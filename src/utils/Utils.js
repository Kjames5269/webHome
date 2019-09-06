/*eslint-env node*/

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

export { isProduction, hasDuplicates };
