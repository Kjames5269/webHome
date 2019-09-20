import React from "react";
import { strToInput, onEnterHelper, plugin } from "./PluginAbstract";
import { SearchBar } from "../SearchBar";

//  Adding to the plugin list
//  {
//      name: google
//      url: url
//      searchUrl?: search/part/
//      getChildren: (args) => <input type="hidden" name={name} value={value}
//  }

const commandList = [
  {
    name: "google",
    url: "https://www.google.com/",
    searchUrl: "search",
    getChildren: args => {
      return strToInput("q", args.join(" "));
    }
  },
  {
    name: "ultimate guitar",
    url: "https://www.ultimate-guitar.com/",
    searchUrl: "search.php",
    getChildren: args => {
      return [
        strToInput("value", args.join(" ")),
        strToInput("search_type", "title")
      ];
    }
  },
  {
    name: "youtube",
    url: "https://www.youtube.com/",
    searchUrl: "results",
    getChildren: args => {
      return strToInput("search_query", args.join(" "));
    }
  },
  {
    name: "amazon",
    url: "https://www.amazon.com/",
    searchUrl: "s",
    getChildren: args => {
      return strToInput("k", args.join(" "));
    }
  },
  {
    name: "vrv",
    url: "https://vrv.co/",
    getChildren: args => {
      return strToInput("q", args.join(" "));
    }
  },
  {
    name: "stack overflow",
    url: "https://stackoverflow.com/",
    searchUrl: "search",
    getChildren: args => {
      return strToInput("q", args.join(" "));
    }
  }
];

const getSimple = name => {
  const filtered = commandList.filter(e => e.name === name);
  return filtered.length == 1 ? filtered[0] : undefined;
};

const SimplePlugin = props => {
  const { name, args, children } = props;

  const simple = getSimple(name);

  const searchUrl =
    simple.searchUrl != undefined ? simple.url + simple.searchUrl : simple.url;
  const onSubmit = args.length == 0 ? onEnterHelper(simple.url) : undefined;

  return (
    <SearchBar {...props} action={searchUrl} onSubmit={onSubmit}>
      {children}
      {simple.getChildren(args)}
    </SearchBar>
  );
};

const SimplePlugins = commandList.map(e => plugin(SimplePlugin, e.name));

export default SimplePlugins;
