import React from "react";
import { SearchBar } from "../SearchBar";

const delimiter = " ";

const strToInput = (queryName, queryParam) => {
  return (
    <input key={queryName} type="hidden" name={queryName} value={queryParam} />
  );
};

const DuckDuckGoPlugin = props => {
  const { args, children } = props;

  return (
    <SearchBar {...props} action={"https://www.duckduckgo.com"}>
      {children}
      {strToInput("q", args.join(" "))}
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

    return {
      cmp: PluginComponent,
      args: argString.split(delimiter).filter(e => e != ""),
      name: name
    };
  }
};

export { strToInput, onEnterHelper, plugin, DuckDuckGoPlugin };
