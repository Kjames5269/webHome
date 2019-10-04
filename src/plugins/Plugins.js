import getPlugins from "./SimplePlugins.js";
import getAliases from "./Aliases.js";
import githubPlugin from "./GithubPlugin.js";
import spotifyPlugin from "./spotifyPlugin.js";
import googlePlugin from "./GooglePlugin.js";
import { isProduction, hasDuplicates } from "../utils/Utils.js";

const arr = [spotifyPlugin, githubPlugin, googlePlugin, ...getPlugins, ...getAliases];

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
 * A plugin is a component that renders a SearchBar.
 * Three props will be passed:
 *  args - [array.string] - parsed arguments
 *  children [components] - children from React
 *  name [string]         - the name of the Plugin being rendered
 *
 * The plugin should render a styled.form(SearchBar)
 *
 * To register a plugin:
 * export ./PluginAbstract.plugin(PluginCmp, 'name of plugin')
 * and add it to the list above.
 */
