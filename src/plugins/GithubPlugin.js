import { jsxWrapper, strToInput, onEnterHelper, parseCmd } from "./PluginAbstract";

const name = "git";
const gitURL = "https://github.com"

const getGithubJsx = args => {
  return jsxWrapper(`${gitURL}/search`, [
    strToInput("q", args.join(" ")),
    strToInput("type", "code")
  ]);
};

const githubPlugin = str => {
  const { cmd, args } = parseCmd(str)

  if (!name.startsWith(cmd)) {
    return [];
  }

  let onEnter = undefined;
  switch(args[0]) {
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

  return [
    {
      name: name,
      jsx: (cmd == name) ? getGithubJsx(args) : undefined,
      onEnter: (cmd == name) ? onEnter : undefined,
      isEq: str => parseCmd(str).cmd == name
    }
  ];
};

export default githubPlugin;
