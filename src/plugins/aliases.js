import React from "react";
import {
  onEnterHelper,
  plugin,
  DefaultSearch,
  useSearchable
} from "./PluginAbstract";

const Aliases = [
  {
    id: "but it was me",
    url:
      "https://i2.kym-cdn.com/entries/icons/original/000/015/559/It_Was_Me__Dio!.jpg"
  },
  { id: "animemes", url: "https://www.reddit.com/r/Animemes/" },
  { id: "anime", url: "https://horriblesubs.info/" },
  { id: "/w", url: "https://boards.4channel.org/w/catalog" },
  { id: "/a", url: "https://boards.4channel.org/a/catalog" },
  { id: "/wg", url: "https://boards.4chan.org/wg/catalog" },
  { id: "chase", url: "https://www.chase.com/" },
  { id: "amex", url: "https://www.americanexpress.com/" },
  { id: "reddit", url: "https://www.reddit.com/" },
  { id: "crunchyroll", url: "https://www.crunchyroll.com/" },
  { id: "horrible subs", url: "https://horriblesubs.info/" },
  { id: "twitch", url: "https://www.twitch.tv/directory/following" },
  { id: "gmail", url: "https://mail.google.com/mail/u/0/" },
  { id: "localhost:8080", url: "http://localhost:8080" },
  { id: "linkedln", url: "https://www.linkedin.com/" },
  { id: "facebook", url: "https://www.facebook.com" }
];

const getAlias = name => {
  const filtered = Aliases.filter(e => e.id === name);
  return filtered.length == 1 ? filtered[0] : undefined;
};

const AliasPlugin = props => {
  const { children, name } = props;

  const [args, searchable] = useSearchable(props);

  const alias = getAlias(name);
  const onSubmit =
    args.length == 0 && alias ? onEnterHelper(alias.url) : undefined;

  return (
    <DefaultSearch
      {...props}
      onSubmit={onSubmit}
      input={`${name} ${args.join(" ")}`}
    >
      {children}
      {searchable}
    </DefaultSearch>
  );
};

const aliasPlugins = Aliases.map(e => plugin(AliasPlugin, e.id));

export default aliasPlugins;
