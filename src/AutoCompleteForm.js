import React, { useState, useRef } from "react";
import { Prompt, Input, ShadowInput, InputLabel } from "./SearchBar";
import { AutoCompleteOptions } from "./AutoCompleteOptions";
import {
  delimiter,
  COMPLETE,
  MATCH,
  INCOMPLETE,
  DefaultSearch
} from "./plugins/PluginAbstract";
import { List } from "immutable";
import { KEY_TAB, KEY_BACK_SPACE } from "keycode-js";
import { findCommonStrs } from "./utils/Utils";

const NUM_PER_ROW = 4;

const matched = result => {
  return result && (result.status == MATCH || result.status == COMPLETE);
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
  const [input, setInput] = useState("");
  const [tabbed, setTabbed] = useState(false);

  const textInput = useRef();

  //  Get all plugin results for the current input
  const results = props.plugins.map(e => e(input)).filter(e => e != undefined);

  const pluginName = results.length == 1 ? results[0].name : undefined;

  const selectedPlugin =
    results.length == 1 && matched(results[0]) ? results[0] : undefined;

  const optionsx = results.map(e => e.name);

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
      if (optionsx.length == 1) {
        //  Auto complete stops once you pass the input
        if (optionsx[0].length >= input.length) {
          setInput(optionsx[0] + delimiter);
          setTabbed(false);
        }
      }
      //  on multiple options find a common string and set the input
      else if (optionsx.length > 1) {
        const commonStr = findCommonStrs(optionsx, e => e);
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

    setInput(e.target.textContent + delimiter);
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
  if (optionsx.length == 1) {
    shadowInput = optionsx[0].substring(input.length);
  }

  const options =
    tabbed && optionsx.length > 1 ? (
      <AutoCompleteOptions
        names={optionsx}
        onSelect={handleAutoComplete}
        onKeyDown={onOptionKeyDown}
        numPerRow={NUM_PER_ROW}
        onRollover={onRollover}
      />
    ) : (
      undefined
    );

  const selectedStatus = selectedPlugin ? selectedPlugin.status : INCOMPLETE;

  //  Check to see if the key is a backspace.
  const onPluginKeyDown = (fn, isEmpty) => e => {
    if (e.keyCode == KEY_BACK_SPACE && isEmpty) {
      setInput(input.substring(0, input.length - 1));
      e.preventDefault();
    }
    return fn(e);
  };

  const inputField = (
    <Input
      id="searchbar"
      key="searchbar"
      type="text"
      value={input}
      autoComplete="off"
      onChange={handleChange}
      onKeyDown={handleTab}
      autoFocus
      match={selectedPlugin}
      length={input.length}
      ref={textInput}
    />
  );

  const inputLabel = (
    <InputLabel key="inputLabel" length={input.length}>
      {input}
    </InputLabel>
  );

  const inputCmp = selectedStatus == COMPLETE ? inputLabel : inputField;

  const PluginCmp = matched(selectedPlugin) ? selectedPlugin.cmp : undefined;

  if (PluginCmp) {
    return (
      <div>
        <PluginCmp
          onClick={() => textInput.current.focus()}
          name={pluginName}
          textRef={textInput}
          status={selectedStatus}
          onKeyDown={onPluginKeyDown}
        >
          <Prompt>{props.prompt}</Prompt>
          {inputCmp}
        </PluginCmp>
      </div>
    );
  } else {
    return (
      <div>
        <DefaultSearch onClick={() => textInput.current.focus()} input={input}>
          <Prompt>{props.prompt}</Prompt>
          {inputField}
          <ShadowInput key="shadowInput" length={shadowInput.length}>
            {shadowInput}
          </ShadowInput>
        </DefaultSearch>
        {options}
      </div>
    );
  }
};

export default AutoCompleteForm;
