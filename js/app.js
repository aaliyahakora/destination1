import Page, { Grid, GridColumn } from "@atlaskit/page";

import React from "react";

import { flattenTree, parseQuery } from "./util";
import Wiki from "./wiki";
import ZeroState from "./zero-state";

export default class extends React.Component {
  render() {
    const { parentRepo, user, app, settings } = parseQuery();
    const props = {
      user: user,
      settings: settings,
      app: app,
      parentRepo: parentRepo
    };
    return (
      <div style={{ display: "flex" }}>
        <Page>
          <Grid spacing="compact">
            <GridColumn medium={12}>
              {!this.settings || !this.settings.repoName ? (
                <ZeroState {...props} />
              ) : (
                <Wiki {...props} />
              )}
            </GridColumn>
          </Grid>
        </Page>
      </div>
    );
  }
}
