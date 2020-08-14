import React, { useState, useRef } from "react";
import { Prompt, SearchBar, Input, ShadowInput } from "./Searchbar.js";
import { AutoCompleteOptions } from "./AutoCompleteOptions.js";
import { defaultJsxWrapper } from "./plugins/PluginAbstract.js";
import { List } from "immutable";
import { KEY_TAB } from "keycode-js";

const NUM_PER_ROW = 4;

//  arr: an Array of objects / strings
//  selector: a function to extract strings from the objects
const findCommonStrs = (list, selector) => {
  let firstWord = selector(list.get(0));
  let commonString = "";
  let charLocal;

  for (let i = 0; i < firstWord.length; i++) {
    charLocal = firstWord.charAt(i);
    for (let j = 1; j < list.size; j++) {
      if (charLocal != selector(list.get(j)).charAt(i)) {
        return commonString;
      }
    }
    commonString += charLocal;
  }
  return commonString;
};

//  Props:
//    plugins:
//     [
//       (str) => { name: string, jsx: fn(FormJsx, formAttrs, children) => jsx, onEnter: fn(event), isEq: boolean }
//     ]
//    > See Plugins.js for adding another plugin / formatting
const AutoCompleteForm = props => {
  //  input is the text within the serach bar
  //  tabbed is true once tab has been pressed in the searchbar
  let [input, setInput] = useState("");
  let [tabbed, setTabbed] = useState(false);

  const textInput = useRef();

  //  Get all plugin results for the current input
  const results = List(
    props.plugins.map(e => e(input)).filter(e => e != undefined)
  );

  //  skip to the website or search
  const handleSubmit = event => {
    const match = results.filter(e => e.isEq);
    if (match != undefined && match.size == 1 && match.get(0).onEnter) {
      return match.get(0).onEnter(event);
    }
    return true;
  };

  //  Text updating
  const handleChange = e => {
    setInput(e.target.value);
    setTabbed(false);
  };

  //  Tab autocomplete
  const handleTab = e => {
    //  The first tab checks for auto completion and sets
    //  the state to tabbed
    if (e.keyCode == KEY_TAB && !tabbed) {
      e.preventDefault();
      setTabbed(true);

      //  On one result set the input
      if (results.size == 1) {
        //  Auto complete stops once you pass the input
        if (results.get(0).name.length >= input.length) {
          setInput(results.get(0).name + " ");
          setTabbed(false);
        }
      }
      //  on multiple results find a common string and set the input
      else if (results.size > 1) {
        const commonStr = findCommonStrs(results, e => e.name);
        setInput(commonStr);
      }
      return;
    } else if (e.keyCode == KEY_TAB) {
      //  No-OP
    } else {
      //  If you type anything else, set tabbed to false
      setTabbed(false);
    }
  };

  const handleAutoComplete = e => {
    e.preventDefault();

    setInput(e.target.textContent + " ");
    setTabbed(false);

    textInput.current.focus();
  };

  const onOptionKeyDown = e => {
    textInput.current.focus();
  };

  const onRollover = () => {
    setTabbed(false);
  };

  // -- End of functions --

  let shadowInput = "";

  //  On one result show the suggested completion
  if (results.size == 1) {
    shadowInput = results.get(0).name.substring(input.length);
  }

  const options =
    tabbed && results.size > 1 ? (
      <AutoCompleteOptions
        names={results.map(e => e.name)}
        onSelect={handleAutoComplete}
        onKeyDown={onOptionKeyDown}
        numPerRow={NUM_PER_ROW}
        onRollover={onRollover}
      />
    ) : (
      undefined
    );

  const formInputs = [
    <Prompt key="prompt">{props.prompt}</Prompt>,
    <Input
      key="searchbar"
      id="searchbar"
      type="text"
      value={input}
      autoComplete="off"
      onChange={handleChange}
      onKeyDown={handleTab}
      autoFocus
      match={results.size == 1}
      ref={textInput}
      length={input.length}
    />,
    <ShadowInput key="shadowInput" length={input.length}>
      {shadowInput}
    </ShadowInput>
  ];

  const formAttrs = {
    onSubmit: handleSubmit,
    onClick: () => textInput.current.focus()
  };
  //  jsxFunc is a function that takes a Form, attrs, and Input fields
  const jsxFunc =
    results.size == 1 && results.get(0).jsx
      ? results.get(0).jsx
      : defaultJsxWrapper(input);

  return (
    <div>
      {jsxFunc(SearchBar, formAttrs, formInputs)}
      {options}
    </div>
  );
};

export default AutoCompleteForm;
