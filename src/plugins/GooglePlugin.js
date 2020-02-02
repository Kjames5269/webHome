import React from "react";
import {
  strToInput,
  useSearchable,
  onEnterHelper,
  plugin,
  delimiter
} from "./PluginAbstract";
import { SearchBar } from "../SearchBar";

const name = "google";
const googleUrl = "https://google.com";

const argMap = [
    {
        name: "drive",
        url: "https://drive.google.com/drive/my-drive"
    },
    {
        name: "maps",
        url: `${googleUrl}/maps`
    },
    {
        name: "translate",
        url: "https://translate.google.com/"
    }
]

const GooglePlugin = props => {
  const { children } = props;
  let onSubmit = undefined;

  const [args, searchable, options] = useSearchable(props, argMap.map(e => e.name));

  const filtered = argMap.filter(e => e.name == args[0])
  if(filtered.length == 1) {
      onSubmit = onEnterHelper(filtered[0].url)
  }

  if (args.length == 0) {
    onSubmit = onEnterHelper(`${googleUrl}/`);
  }

  return (
    <div>
      <SearchBar {...props} action={`${googleUrl}/search`} onSubmit={onSubmit}>
        {children}
        {searchable}
        {strToInput("q", args.join(delimiter))}
      </SearchBar>
      {options}
    </div>
  );
};

export default plugin(GooglePlugin, name);
