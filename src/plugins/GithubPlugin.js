import React from "react";
import {
  strToInput,
  useSearchable,
  onEnterHelper,
  plugin,
  delimiter
} from "./PluginAbstract";
import { SearchBar } from "../SearchBar";

const name = "git";
const gitURL = "https://github.com";

const GithubPlugin = props => {
  const { children } = props;
  let onSubmit = undefined;

  const [args, searchable, options] = useSearchable(props, ["issues", "prs"]);

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
    <div>
      <SearchBar {...props} action={`${gitURL}/search`} onSubmit={onSubmit}>
        {children}
        {searchable}
        {strToInput("q", args.join(delimiter))}
        {strToInput("type", "code")}
      </SearchBar>
      {options}
    </div>
  );
};

export default plugin(GithubPlugin, name);
