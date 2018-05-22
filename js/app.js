import Page, { Grid, GridColumn } from "@atlaskit/page";

import React from "react";

import Content from "./content";
import Header from "./header";
import Sidebar from "./sidebar";
import Settings from "./settings";
import SettingsModal from "./settings-modal";
import makeRequest from "./request";
import { flattenTree, parseQuery } from "./util";

const basename = /^(.+)\..+$/;

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { parentRepo, user, app, settings } = parseQuery();

    this.parentRepo = parentRepo;
    this.user = user;
    this.app = app;
    this.settings = settings;

    this.state = {
      path: settings.index,
      settingsOpen: false,
      files: [],
      cards: []
    };

    if (settings.repoName) {
      this.getWikiFiles();
    }
  }

  componentDidMount() {
    window.AP.sizeToParent();
  }

  getWikiFiles = () => {
    makeRequest({
      url: `/internal/repositories/${this.settings.repoName}/tree/master/`
    }).then(tree => {
      const fileTree = flattenTree(tree[0]);
      const cards = fileTree.filter(x => x.name.startsWith("cards"));
      this.setState({
        files: fileTree,
        cards
      });
    });
  };

  closeSettings = () => {
    this.setState({ settingsOpen: false });
  };

  openSettings = () => {
    this.setState({ settingsOpen: true });
  };

  onOpenFile = file => {
    this.setState({
      path: file.name
    });
  };

  onOpenPath = path => {
    // look for exact path in our file list
    const exactFile = this.state.files.find(
      file => encodeURI(file.name) === path
    );
    if (exactFile) {
      this.setState({
        path: exactFile.name
      });
      return;
    }
    // check without extensions
    const almostFile = this.state.files.find(file => {
      const match = basename.exec(encodeURI(file.name));
      return match && match[1] === path;
    });

    if (almostFile) {
      this.setState({
        path: almostFile.name
      });
    }
  };

  render() {
    const settingsProps = {
      closeSettings: this.closeSettings,
      settings: this.settings,
      app: this.app,
      parentRepo: this.parentRepo
    };

    return (
      <div style={{ display: "flex" }}>
        <Page>
          <Grid spacing="compact">
            {!this.settings || !this.settings.repoName ? (
              <GridColumn medium={12}>
                <Settings
                  title="Setup"
                  text="Hey set your thing up!"
                  {...settingsProps}
                />
              </GridColumn>
            ) : (
              <GridColumn medium={12}>
                <Header
                  user={this.user}
                  settings={this.settings}
                  parentRepo={this.parentRepo}
                  app={this.app}
                  path={this.state.path}
                  onCloseSettings={this.closeSettings}
                  onOpenSettings={this.openSettings}
                />
                <Content
                  repoName={this.settings.repoName}
                  path={this.state.path}
                  onOpenPath={this.onOpenPath}
                />
              </GridColumn>
            )}
            {this.state.settingsOpen && <SettingsModal {...settingsProps} />}
          </Grid>
        </Page>
        {this.settings && this.settings.repoName && (
          <Sidebar
            cards={this.state.cards}
            repoName={this.settings.repoName}
            onOpenPath={this.onOpenPath}
            onOpenFile={this.onOpenFile}
            files={this.state.files}
          />
        )}
      </div>
    );
  }
}
