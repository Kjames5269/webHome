import React from "react";

const delimiter = " ";

const strToInput = (queryName, queryParam) => {
  return (
    <input key={queryName} type="hidden" name={queryName} value={queryParam} />
  );
};

//  Takes a url, and children to add to the form,
//  Then takes a Form, attrs, and more children
const jsxWrapper = (url, extraChildren) => {
  return (FormJsx, formAttrs, children) => (
    <FormJsx {...formAttrs} action={url}>
      {children}
      {extraChildren}
    </FormJsx>
  );
};

const defaultJsxWrapper = str => {
  return jsxWrapper("https://www.duckduckgo.com", strToInput("q", str));
};

//  Takes a url and returns an onEnter Listener to redirect to that url
const onEnterHelper = url => e => {
  e.preventDefault();
  window.location.href = url;
  return false;
};

//  Standardizes parsing
//  export plugin(simplePlugin, 'name')
//  fn: (args, jsxWrapper) =>
//    { jsx: Jsx, onEnter: fn(e) }
const plugin = (fn, name) => str => {
  const cmd = str.substring(0, name.length);
  const argString = str.substring(name.length + 1); // for delimiter

  //  valid if the command is not long enough for a delimiter
  //  or the delimiter exists
  const localDelimiter = str.charAt(name.length);
  const valid = localDelimiter == "" || localDelimiter == delimiter;

  if (valid && name.startsWith(cmd)) {
    //  if the command isn't equal to the name, return how to get the name
    if (cmd != name) {
      return { name: name };
    }

    const args = argString.split(delimiter).filter(e => e != "");

    return {
      ...fn(args, jsxWrapper),
      isEq: cmd === name,
      name: name
    };
  }
};

export { jsxWrapper, defaultJsxWrapper, strToInput, onEnterHelper, plugin };
