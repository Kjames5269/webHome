import React, { useState, useRef } from "react";
import { Prompt, Input, ShadowInput } from "./SearchBar";
import { AutoCompleteOptions } from "./AutoCompleteOptions";
import { DuckDuckGoPlugin } from "./plugins/PluginAbstract";
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
//       (str) => { name: string, cmp?: ReactCmp, args?: [string] }
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

  const selectedPlugin = results.size == 1 ? results.get(0) : undefined;

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
      if (selectedPlugin) {
        //  Auto complete stops once you pass the input
        if (selectedPlugin.name.length >= input.length) {
          setInput(selectedPlugin.name + " ");
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
  if (selectedPlugin) {
    shadowInput = selectedPlugin.name.substring(input.length);
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

  const PluginCmp =
    selectedPlugin && selectedPlugin.cmp
      ? selectedPlugin.cmp
      : DuckDuckGoPlugin;

  const args =
    selectedPlugin && selectedPlugin.args ? selectedPlugin.args : [input];

  const name = selectedPlugin ? selectedPlugin.name : undefined;

  return (
    <div>
      <PluginCmp
        onClick={() => textInput.current.focus()}
        args={args}
        name={name}
      >
        <Prompt>{props.prompt}</Prompt>
        <Input
          id="searchbar"
          type="text"
          value={input}
          autoComplete="off"
          onChange={handleChange}
          onKeyDown={handleTab}
          autoFocus
          match={selectedPlugin}
          ref={textInput}
          length={input.length}
        />
        <ShadowInput length={input.length}>{shadowInput}</ShadowInput>
      </PluginCmp>
      {options}
    </div>
  );
};

export default AutoCompleteForm;
