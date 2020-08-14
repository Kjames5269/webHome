import { onEnterHelper, plugin } from "./PluginAbstract";

const name = "zillow";
const zillowURL = "https://www.zillow.com";

const zillowPlugin = args => {
  let onEnter = undefined;

  if (args.length == 0) {
    onEnter = onEnterHelper(`${zillowURL}/`);
  } else {
    onEnter = onEnterHelper(`${zillowURL}/homes/` + args.join(" "));
  }

  return {
    jsx: undefined,
    onEnter: onEnter
  };
};

export default plugin(zillowPlugin, name);
