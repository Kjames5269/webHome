import React, { useState, useRef, useContext } from "react";
import { TabCompDiv, Button } from "./Buttons";
import { Prompt, SearchBar, Input, ShadowInput } from "./SearchBar";
import { defaultJsxWrapper } from "./plugins/PluginAbstract";
import Theme from "./Theme";

const TAB_KEY = 9;
const ENTER_KEY = 13;
const SHIFT_KEY = 16;
const NUM_PER_ROW = 4;

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

//  Props:
//    plugins:
//     [
//       (str) => { name: string, jsx: fn(FormJsx, formAttrs, children) => jsx, onEnter: fn(event), isEq: fn(str) }
//     ]
//    > See Plugins.js for adding another plugin / formatting
const AutoCompleteForm = props => {
  //  input is the text within the serach bar
  //  tabbed is true once tab has been pressed in the searchbar
  let [input, setInput] = useState("");
  let [tabbed, setTabbed] = useState(false);

  const textInput = useRef();
  const theme = useContext(Theme);

  //  Get all plugin results for the current input
  //  Pretend this is immutable
  const results = props.plugins.map(e => e(input)).flat();

  //  skip to the website or search
  const handleSubmit = e => {
    const match = results.filter(e => e.isEq(input));
    if (match != undefined && match.length == 1 && match[0].onEnter) {
      return match[0].onEnter(e);
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
    if (e.keyCode == TAB_KEY && !tabbed) {
      e.preventDefault();
      setTabbed(true);

      //  On one result set the input
      if (results.length == 1) {
        //  Auto complete stops once you pass the input
        if (results[0].name.length >= input.length) {
          setInput(results[0].name + " ");
        }
      }
      //  on multiple results setup options to tab
      else if (results.length > 1) {
        const commonStr = findCommonStrs(results, e => e.name);
        setInput(commonStr);
      }
      return;
    } else if (e.keyCode == TAB_KEY) {
      //  No-OP
    } else {
      //  If you type anything else, set tabbed to false
      setTabbed(false);
    }
  };

  const onOptionsBlur = e => {
    const nums = e.target.getAttribute("data-id");
    if (nums == results.length) {
      setTabbed(false);
    }
  };

  const handleAutoComplete = e => {
    setInput(e.target.textContent + " ");
    setTabbed(false);

    textInput.current.focus();
  };

  const onOptionKeyDown = e => {
    if (
      e.keyCode == TAB_KEY ||
      e.keyCode == ENTER_KEY ||
      e.keyCode == SHIFT_KEY
    ) {
      return;
    }
    textInput.current.focus();
  };

  // -- End of functions --

  let shadowInput = "";

  //  On one result show the suggested completion
  if (results.length == 1) {
    shadowInput = results[0].name.substring(input.length);
  }

  let options;

  if (tabbed && results.length > 1) {
    options = results.map((e, f) => (
      <Button
        onBlur={onOptionsBlur}
        onClick={handleAutoComplete}
        onKeyDown={onOptionKeyDown}
        key={f + 1}
        data-id={f + 1}
        numPerRow={NUM_PER_ROW}
        {...theme.colors}
      >
        {e.name}
      </Button>
    ));
  }

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
      match={results.length == 1}
      ref={textInput}
      length={input.length}
    />,
    <ShadowInput key="shadowInput" length={input.length}>
      {shadowInput}
    </ShadowInput>
  ];

  const formAttrs = { onSubmit: handleSubmit, onClick: () => textInput.current.focus() };
  //  jsxFunc is a function that takes a Form, attrs, and Input fields
  const jsxFunc =
    results.length == 1 && results[0].jsx
      ? results[0].jsx
      : defaultJsxWrapper(input);

  return (
    <div>
      {jsxFunc(SearchBar, formAttrs, formInputs)}
      <TabCompDiv yLength={options ? Math.ceil(options.length / 4) : options}>
        {options}
      </TabCompDiv>
    </div>
  );
};

export default AutoCompleteForm;
