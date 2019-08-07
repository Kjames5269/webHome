import React from "react";

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

export { jsxWrapper, defaultJsxWrapper, strToInput };
