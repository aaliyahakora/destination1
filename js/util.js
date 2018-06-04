import { getQuery } from "./request";

export const flattenTree = (directory, parent = "") => {
  let flat = [];
  // Don't catalog files that aren't valid (renderable) wiki files
  const validName = /.+\.(md|mkd|mkdn|mdown|markdown|text|rst)/;
  directory.contents.forEach(content => {
    if (content.type === "directory") {
      flat = flat.concat(flattenTree(content, `${parent}${content.name}/`));
    } else if (validName.exec(content.name)) {
      flat.push(
        Object.assign({}, content, {
          name: `${parent}${content.name}`
        })
      );
    }
  });
  return flat;
};

export const parseSettings = rawSettings => {
  const settings = {};
  const settingsArray = rawSettings.split(",");

  while (settingsArray.length) {
    const [key, val] = settingsArray.splice(0, 2);
    settings[key] = val;
  }

  return settings;
};

export const parseQuery = () => ({
  parentRepo: {
    repoName: getQuery("repo"),
    repoUuid: getQuery("repoUuid"),
    // FIXME - this is used to generate the wiki repo url and as such may be
    // wrong if you have a git repo and hg wiki
    repoScm: getQuery("repoScm")
  },
  user: {
    userName: getQuery("userName"),
    userUuid: getQuery("userUuid"),
    userIsAdmin: getQuery("userIsAdmin"),
  },
  app: { appKey: getQuery("appKey"), origin: getQuery("xdm_e") },
  settings: parseSettings(getQuery("settings"))
});
