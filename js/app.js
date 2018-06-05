import React from "react";

import { parseQuery } from "./util";
import Wiki from "./wiki";
import ZeroState from "./zero-state";

export default class extends React.Component {
  render() {
    const { parentRepo, user, app, settings } = parseQuery();
    const props = {
      user,
      settings,
      app,
      parentRepo
    };

    return (
      <div style={{ display: "flex" }}>

        {!settings || !settings.repoName ? (
          <ZeroState {...props} />
        ) : (
          <Wiki {...props} />
        )}
      </div>
    );
  }
}
