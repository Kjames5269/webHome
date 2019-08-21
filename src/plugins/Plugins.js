import getPlugins from "./SimplePlugins.js";
import getAliases from "./Aliases.js";
import githubPlugin from "./GithubPlugin.js";

export default [...getPlugins, ...getAliases, githubPlugin];

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
