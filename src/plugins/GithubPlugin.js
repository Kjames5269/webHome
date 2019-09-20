import React from "react";
import { strToInput, onEnterHelper, plugin } from "./PluginAbstract";
import { SearchBar } from "../SearchBar";

const name = "git";
const gitURL = "https://github.com";

const githubPlugin = props => {
  const { args, children } = props;
  let onSubmit = undefined;

  switch (args[0]) {
    case "issues":
      onSubmit = onEnterHelper(`${gitURL}/issues`);
      break;
    case "prs":
      onSubmit = onEnterHelper(`${gitURL}/pulls`);
      break;
  }

  if (args.length == 0) {
    onSubmit = onEnterHelper(`${gitURL}/`);
  }

  return (
    <SearchBar {...props} url={`${gitURL}/search`} onSubmit={onSubmit}>
      {children}
      {strToInput("q", args.join(" "))}
      {strToInput("type", "code")}
    </SearchBar>
  );
};

export default plugin(githubPlugin, name);
