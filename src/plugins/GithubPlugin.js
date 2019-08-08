import { jsxWrapper, strToInput } from "./PluginAbstract";

const name = "git";
const gitURL = "https://github.com"

const githubOnEnterHelper = url => e => {
  e.preventDefault();
  window.location.href = url;
  return false;
};

const getGithubJsx = args => {
  return jsxWrapper(`${gitURL}/search`, [
    strToInput("q", args.join(" ")),
    strToInput("type", "code")
  ]);
};

const githubPlugin = str => {
  const split = str.split(" ");
  const cmd = split[0];
  if (!name.startsWith(cmd)) {
    return [];
  }
  const args = split.slice(1);

  let onEnter = undefined;
  if (args[0] == "issues") {
    onEnter = githubOnEnterHelper(`${gitURL}/issues`);
  } else if (args[0] == "prs") {
    onEnter = githubOnEnterHelper(`${gitURL}/pulls`);
  } else if (args.length == 0) {
    onEnter = githubOnEnterHelper(`${gitURL}/`);
  }

  return [
    {
      name: name,
      jsx: getGithubJsx(args),
      onEnter: onEnter,
      isEq: str => str.split(" ")[0] == name
    }
  ];
};

export default githubPlugin;
