import { strToInput, onEnterHelper, plugin } from "./PluginAbstract";

//  Adding to the plugin list
//  {
//      name: google
//      doEval: fn(url, args, jsxWrapper) => jsxWrapper(url, hiddenInputs)
//  }

const commandList = [
  {
    name: "google",
    url: "https://www.google.com/",
    doEval: (url, args, jsxWrapper) => {
      return jsxWrapper(`${url}search`, strToInput("q", args.join(" ")));
    }
  },
  {
    name: "ultimate guitar",
    url: "https://www.ultimate-guitar.com/",
    doEval: (url, args, jsxWrapper) => {
      return jsxWrapper(`${url}search.php`, [
        strToInput("value", args.join(" ")),
        strToInput("search_type", "title")
      ]);
    }
  },
  {
    name: "youtube",
    url: "https://www.youtube.com/",
    doEval: (url, args, jsxWrapper) => {
      return jsxWrapper(
        `${url}results`,
        strToInput("search_query", args.join(" "))
      );
    }
  },
  {
    name: "amazon",
    url: "https://www.amazon.com/",
    doEval: (url, args, jsxWrapper) => {
      return jsxWrapper(`${url}s`, strToInput("k", args.join(" ")));
    }
  },
  {
    name: "vrv",
    url: "https://vrv.co/",
    doEval: (url, args, jsxWrapper) => {
      return jsxWrapper(url, strToInput("q", args.join(" ")));
    }
  },
  {
    name: "stack overflow",
    url: "https://stackoverflow.com/",
    doEval: (url, args, jsxWrapper) => {
      return jsxWrapper(`${url}search`, strToInput("q", args.join(" ")));
    }
  }
];

//  Takes an elememnt from the commandList and returns a function
//  that takes a cmd and args
const getPlugin = cle => (args, jsxWrapper) => {
  return {
    jsx: cle.doEval(cle.url, args, jsxWrapper),
    onEnter: args.length == 0 ? onEnterHelper(cle.url) : undefined
  };
};

const simplePlugins = commandList.map(e => plugin(getPlugin(e), e.name));

export default simplePlugins;
