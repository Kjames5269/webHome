import React, { useState, useRef, useContext } from "react";
import { TabCompDiv, Button } from "./Buttons";
import { Prompt, SearchBar, Input, ShadowInput } from "./SearchBar";
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
//      dict: A set of items to enable autocomplete
const AutoCompleteForm = props => {
  //  input is the text within the serach bar
  //  match is the currently matched option
  //  matches are the potential matched options
  //  tabbed is true once tab has been pressed in the searchbar
  //  tabbedTo is the current index of the tabbed buttons +1
  let [input, setInput] = useState("");
  let [match, setMatch] = useState([]);
  let [matches, setMatches] = useState([]);
  let [tabbed, setTabbed] = useState(false);
  let textInput = useRef();

  const theme = useContext(Theme);

  const checkMatches = str => {
    return props.dict.filter(ele => {
      return ele.id === str.trim();
    });
  };

  //  skip to the website or search
  const handleSubmit = e => {
    if (match.length != 0) {
      e.preventDefault();
      window.location.href = match[0].url;
      return false;
    }
    return true;
  };

  //  Text updating
  const handleChange = e => {
    setInput(e.target.value);
    setMatch(checkMatches(e.target.value));
    setMatches([]);
  };

  //  Tab autocomplete
  const handleTab = e => {
    //  The first tab checks for auto completion and sets
    //  the state to tabbed
    if (e.keyCode == TAB_KEY && !tabbed) {
      e.preventDefault();
      setTabbed(true);

      //  Filter the results from the alias ids
      let results = props.dict.filter(ele => {
        return ele.id.startsWith(input);
      });

      //  On one resault set the input and state
      if (results.length == 1) {
        setInput(results[0].id + " ");
        setMatch(results);
      }
      //  on multiple results setup options to tab
      else if (results.length > 1) {
        const commonStr = findCommonStrs(results, selector => selector.id);
        setInput(commonStr);
        setMatches(results);
        setMatch(checkMatches(commonStr));
      }
      return;
    } else if (e.keyCode == TAB_KEY) {
      //  No-OP
    } else {
      setTabbed(false);
    }
  };

  const onOptionsBlur = e => {
    const nums = e.target.getAttribute("data-id");
    if (nums == matches.length) {
      setTabbed(false);
    }
  };

  const handleAutoComplete = e => {
    setInput(e.target.textContent + " ");
    setMatch(checkMatches(e.target.textContent));
    setMatches([]);
    setTabbed(false);

    textInput.current.focus();
  };

  const onOptionKeyDown = e => {
    console.log(e.keyCode);
    if (
      e.keyCode == TAB_KEY ||
      e.keyCode == ENTER_KEY ||
      e.keyCode == SHIFT_KEY
    ) {
      return;
    }
    textInput.current.focus();
  };

  const focusPrimary = e => {
    textInput.current.focus();
  }

  // -- End of functions --

  let shadowInput = "";

  let results = props.dict.filter(ele => {
    return ele.id.startsWith(input);
  });

  //  On one resault set the input and state
  if (results.length == 1) {
    shadowInput = results[0].id.substring(input.length);
  }

  let options;

  if (tabbed) {
    options = matches.map((e, f) => (
      <Button
        onBlur={onOptionsBlur}
        onClick={handleAutoComplete}
        onKeyDown={onOptionKeyDown}
        key={f + 1}
        data-id={f + 1}
        numPerRow={NUM_PER_ROW}
        {...theme.colors}
      >
        {e.id}
      </Button>
    ));
  }
  return (
    <div>
      <SearchBar action="https://www.duckduckgo.com" onSubmit={handleSubmit} onClick={focusPrimary}>
        <Prompt>{props.prompt}</Prompt>
        <Input
          id="searchbar"
          type="text"
          name="q"
          value={input}
          autoComplete="off"
          onChange={handleChange}
          onKeyDown={handleTab}
          autoFocus
          match={match.length == 1}
          ref={textInput}
          length={input.length}
        />
        <ShadowInput length={input.length}>{shadowInput}</ShadowInput>
      </SearchBar>

      <TabCompDiv yLength={options ? Math.ceil(options.length / 4) : options}>
        {options}
      </TabCompDiv>
    </div>
  );
};

export default AutoCompleteForm;
