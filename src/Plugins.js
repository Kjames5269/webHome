import { jsxWrapper, strToInput } from "./PluginAbstract";

//  Adding to the plugin list
//  {
//      name: google
//      doEval: fn(args) => jsxWrapper(url, hiddenInputs)
//  }

const commandList = [
  {
    name: "google",
    doEval: args => {
      return jsxWrapper("https://www.google.com/search", strToInput("q", args.join(" ")))
    }
  },
  {
    name: "guitar",
    doEval: args => {
        return jsxWrapper("https://www.ultimate-guitar.com/search.php", [
            strToInput("value", args.join(" ")),
            strToInput("search_type", "title")
        ])
    }
  },
  {
      name: "youtube", 
      url: "https://www.youtube.com/results",
      doEval: args => {
          return jsxWrapper("https://www.youtube.com/results", strToInput("search_query", args.join(" ")))
      }
  },
  {
      name: "amazon",
      doEval: args => {
        return jsxWrapper("https://www.amazon.com/s", strToInput("k", args.join(" ")))
      }
  }
];

//  getPlugin takes a String and will return
//  an array of objects containing 
//  { name: str, jsx: fn(Form, formAttrs, children), onEnter: fn(event), isEq: fn(str) }
const getPlugin = str => {
  const splitStr = str.split(" ");
  const cmd = splitStr[0];
  const args = splitStr.slice(1);
  return commandList
    .filter(e => e.name.startsWith(cmd))
    .map(e => {
      return {
        name: e.name,
        jsx: e.doEval(args),
        onEnter: undefined,
        isEq: str => str.split(" ")[0] == e.name
      };
    });
};

export default getPlugin;
