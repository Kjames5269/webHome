import { onEnterHelper, plugin } from "./PluginAbstract";

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

//  Takes an elememnt from the commandList and returns a function
//  that takes a cmd and args
const getPlugin = aliasEle => (args, jsx) => {
  return {
    name: aliasEle.id,
    jsx: undefined,
    onEnter: args.length == 0 ? onEnterHelper(aliasEle.url) : undefined
  };
};

const aliasPlugins = Aliases.map(e => plugin(getPlugin(e), e.id));

export default aliasPlugins;
