import { jsxWrapper, strToInput, onEnterHelper, isEmpty, parseCmd } from "./PluginAbstract";

//  Adding to the plugin list
//  {
//      name: google
//      doEval: fn(args) => jsxWrapper(url, hiddenInputs)
//  }

const commandList = [
  {
    name: "google",
    url: "https://www.google.com/",
    doEval: (url, args) => {
      return jsxWrapper(
        `${url}search`,
        strToInput("q", args.join(" "))
      );
    }
  },
  {
    name: "uGuitar",
    url: "https://www.ultimate-guitar.com/",
    doEval: (url, args) => {
      return jsxWrapper(`${url}search.php`, [
        strToInput("value", args.join(" ")),
        strToInput("search_type", "title")
      ]);
    }
  },
  {
    name: "youtube",
    url: "https://www.youtube.com/",
    doEval: (url, args) => {
      return jsxWrapper(
        `${url}results`,
        strToInput("search_query", args.join(" "))
      );
    }
  },
  {
    name: "amazon",
    url: "https://www.amazon.com/",
    doEval: (url, args) => {
      return jsxWrapper(
        `${url}s`,
        strToInput("k", args.join(" "))
      );
    }
  },{
    name: "vrv",
    url: "https://vrv.co/",
    doEval: (url, args) => {
      return jsxWrapper(
        url,
        strToInput("q", args.join(" "))
      )
    }
  }
];

//  getPlugin takes a String and will return
//  an array of objects containing
//  { name: str, jsx: fn(Form, formAttrs, children), onEnter: fn(event), isEq: fn(str) }
const getPlugin = str => {
  const { cmd, args } = parseCmd(str);
  return commandList
    .filter(e => e.name.startsWith(cmd))
    .map(e => {
      return {
        name: e.name,
        jsx: (cmd === e.name) ? e.doEval(e.url, args) : undefined,
        onEnter: (cmd === e.name && args.length == 0) ? onEnterHelper(e.url) : undefined,
        isEq: str => parseCmd(str).cmd == e.name
      };
    });
};

export default getPlugin;
