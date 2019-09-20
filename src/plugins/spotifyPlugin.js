import React from "react";
import { onEnterHelper, plugin } from "./PluginAbstract";
import { SearchBar } from "../SearchBar.js";

const name = "spotify";
const spotifyURL = "https://open.spotify.com";

const SpotifyPlugin = props => {
  const { args, children } = props;
  let onSubmit = undefined;

  if (args.length == 0) {
    onSubmit = onEnterHelper(`${spotifyURL}/`);
  } else {
    onSubmit = onEnterHelper(`${spotifyURL}/search/` + args.join(" "));
  }

  return (
    <SearchBar {...props} onSubmit={onSubmit}>
      {children}
    </SearchBar>
  );
};

export default plugin(SpotifyPlugin, name);
