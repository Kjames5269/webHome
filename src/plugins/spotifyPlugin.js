import { onEnterHelper, plugin } from "./PluginAbstract";

const name = "spotify";
const spotifyURL = "https://open.spotify.com";

const spotifyPlugin = (args) => {
  let onEnter = undefined;

  if (args.length == 0) {
    onEnter = onEnterHelper(`${spotifyURL}/`);
  }
  else {
      onEnter = onEnterHelper(`${spotifyURL}/search/` + args.join(' '))
  }

  return {
    jsx: undefined,
    onEnter: onEnter
  };
};

export default plugin(spotifyPlugin, name);