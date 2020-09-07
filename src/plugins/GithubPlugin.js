import { strToInput, onEnterHelper, plugin } from "./PluginAbstract";

const name = "github";
const gitURL = "https://github.com";

const getGithubJsx = (args, jsxWrapper) => {
  return jsxWrapper(`${gitURL}/search`, [
    strToInput("q", args.join(" ")),
    strToInput("type", "code")
  ]);
};

const githubPlugin = (args, jsxWrapper) => {
  let onEnter = undefined;
  switch (args[0]) {
    case "issues":
      onEnter = onEnterHelper(`${gitURL}/issues`);
      break;
    case "prs":
      onEnter = onEnterHelper(`${gitURL}/pulls`);
      break;
  }

  if (args.length == 0) {
    onEnter = onEnterHelper(`${gitURL}/`);
  }

  return {
    jsx: getGithubJsx(args, jsxWrapper),
    onEnter: onEnter
  };
};

export default plugin(githubPlugin, name);
