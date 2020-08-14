import getPlugins from "./SimplePlugins.js";
import getAliases from "./Aliases.js";
import githubPlugin from "./GithubPlugin.js";
import spotifyPlugin from "./SpotifyPlugin.js";
import zillowPlugin from "./ZillowPlugin.js";
import { isProduction, hasDuplicates } from "../utils/Utils.js";

const arr = [
  ...getPlugins,
  ...getAliases,
  githubPlugin,
  spotifyPlugin,
  zillowPlugin
];

//  Check to see if there are duplicates if it's not in production
if (!isProduction()) {
  hasDuplicates(arr.map(e => e("").name), e => {
    throw new Error(`A plugin with the name '${e}' already exists`);
  });
}

export default arr;

/*
 * Plugins:
 *
 * A plugin is a function that will take two parameters
 * (args, jsxFn) => { jsx: jsxFn('url', JsxFormInput's), onEnter: fn(e)}
 *
 * To register a plugin:
 * export ./PluginAbstract.plugin(Plugin, 'name of plugin')
 * and add it to the list above.
 */
