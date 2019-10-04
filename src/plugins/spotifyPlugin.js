import React from "react";
import { onEnterHelper, plugin, useSearchable } from "./PluginAbstract";
import { SearchBar } from "../SearchBar.js";

const name = "spotify";
const spotifyURL = "https://open.spotify.com";

const SpotifyPlugin = props => {
  const { children } = props;
  let onSubmit = undefined;

  const [args, searchable] = useSearchable(props);

  if (args.length == 0) {
    onSubmit = onEnterHelper(`${spotifyURL}/`);
  } else {
    onSubmit = onEnterHelper(`${spotifyURL}/search/` + args.join(" "));
  }

  return (
    <SearchBar {...props} onSubmit={onSubmit}>
      {children}
      {searchable}
    </SearchBar>
  );
};

export default plugin(SpotifyPlugin, name);
