import React from "react";

const delimiter = " "

const strToInput = (queryName, queryParam) => {
  return <input type="hidden" name={queryName} value={queryParam} />;
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

//  Takes a string and returns the 'cmd' and an array of args
const parseCmd = str => {
  const splitStr = str.split(delimiter);
  const cmd = splitStr[0];
  const args = splitStr.slice(1).filter(e => e != "");
  return {
    cmd: cmd,
    args: args
  }
}

export { jsxWrapper, defaultJsxWrapper, strToInput, onEnterHelper, parseCmd };
