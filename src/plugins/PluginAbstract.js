import React, { useState } from "react";
import { SearchBar, ShadowInput, Input } from "../SearchBar";
import { AutoCompleteOptions } from "../AutoCompleteOptions";
import { KEY_TAB } from "keycode-js";
import { findCommonStrs } from "../utils/Utils.js";

const delimiter = " ";

const MATCH = 2; //  The cmd matches
const COMPLETE = 1; //  There's a delimiter so it's okay to search
const INCOMPLETE = 0; //  The cmd does not match

const strToInput = (queryName, queryParam) => {
  return (
    <input key={queryName} type="hidden" name={queryName} value={queryParam} />
  );
};

const DefaultSearch = props => {
  const { input, children } = props;

  return (
    <SearchBar {...props} action={"https://www.duckduckgo.com"}>
      {children}
      {strToInput("q", input)}
    </SearchBar>
  );
};

//  Takes a url and returns an onEnter Listener to redirect to that url
const onEnterHelper = url => e => {
  e.preventDefault();
  window.location.href = url;
  return false;
};

//  Standardizes parsing
//  export plugin(PluginComponent, 'name')
const plugin = (PluginComponent, name) => str => {
  const cmd = str.substring(0, name.length);

  //  valid if the command is not long enough for a delimiter
  //  or the delimiter exists
  const localDelimiter = str.charAt(name.length);
  const valid = localDelimiter == "" || localDelimiter == delimiter;

  if (valid && name.startsWith(cmd)) {
    //  if the command isn't equal to the name, return how to get the name
    if (cmd != name) {
      return { name: name, status: INCOMPLETE };
    }

    return {
      cmp: PluginComponent,
      name: name,
      status: localDelimiter ? COMPLETE : MATCH
    };
  }
};

const useSearchable = (props, arrayOfOptions = []) => {
  const { textRef, onKeyDown, name, status } = props;

  const [tabbed, setTabbed] = useState(false);
  const [input, setInput] = useState("");

  const args = input.split(delimiter).filter(e => e != "");

  const optionNames = arrayOfOptions.filter(e => e.startsWith(input));

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
      if (optionNames.length == 1) {
        //  Auto complete stops once you pass the input
        if (optionNames[0].length >= input.length) {
          setInput(optionNames[0] + delimiter);
          setTabbed(false);
        }
      }
      //  on multiple options find a common string and set the input
      else if (optionNames.length > 1) {
        const commonStr = findCommonStrs(optionNames, e => e);
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

    textRef.current.focus();
  };

  const onOptionKeyDown = e => {
    textRef.current.focus();
  };

  const onRollover = () => {
    setTabbed(false);
  };

  const options =
    tabbed && optionNames.length > 1 ? (
      <AutoCompleteOptions
        names={optionNames}
        onKeyDown={onOptionKeyDown}
        numPerRow={4}
        onRollover={onRollover}
        onSelect={handleAutoComplete}
      />
    ) : (
      undefined
    );

  const shadowInput =
    optionNames.length == 1
      ? optionNames[0].substring(input.length)
      : undefined;

  const shadowInputCmp =
    optionNames.length == 1 ? (
      <ShadowInput key="pluginShadowInput" length={shadowInput.length}>
        {shadowInput}
      </ShadowInput>
    ) : (
      undefined
    );

  const searchable =
    status == COMPLETE
      ? [
          <Input
            key="searchable"
            id="searchable"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            length={input.length}
            ref={textRef}
            autoFocus
            value={input}
            onKeyDown={onKeyDown(handleTab, args.length == 0)}
            buffer={name.length + 1}
          />,
          shadowInputCmp
        ]
      : undefined;

  return [args, searchable, options];
};

export {
  strToInput,
  onEnterHelper,
  plugin,
  DefaultSearch,
  delimiter,
  useSearchable,
  MATCH,
  COMPLETE,
  INCOMPLETE
};
