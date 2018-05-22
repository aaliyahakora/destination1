import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import PageHeader from "@atlaskit/page-header";
import React from "react";

import CloneModalButton from "./clone-button";
import Content from "./content";
import Sidebar from "./sidebar";
import SettingsModal from "./settings-modal";
import makeRequest from "./request";
import { flattenTree, parseQuery } from "./util";

const basename = /^(.+)\..+$/;

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {parentRepo, user, app, settings} = parseQuery()

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
    return (
      <div style={{ display: "flex" }}>
        <Page>
          <Grid spacing="compact">
            <GridColumn medium={12}>
              <PageHeader
                breadcrumbs={
                  <BreadcrumbsStateless>
                    <BreadcrumbsItem text={this.parentRepo.repoName.split("/")[0]} />
                    <BreadcrumbsItem text={this.parentRepo.repoName.split("/")[1]} />
                  </BreadcrumbsStateless>
                }
                actions={
                  <ButtonGroup>
                    <CloneModalButton origin={this.app.origin} repo={this.parentRepo} user={this.user} settings={this.settings} >
                      Clone
                    </CloneModalButton>
                    <Button
                      href={`${this.app.origin}/${this.settings.repoName}/src/master/${
                        this.state.path
                      }?mode=edit&spa=0&fileviewer=file-view-default`}
                      target="_blank"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => this.setState({ settingsOpen: true })}
                    >
                      Settings
                    </Button>
                  </ButtonGroup>
                }
              />
              <Content repoName={this.settings.repoName} path={this.state.path} onOpenPath={this.onOpenPath} />
              {this.state.settingsOpen && (
                <SettingsModal
                  closeSettings={this.closeSettings}
                  settings={this.settings}
                  app={this.app}
                  parentRepo={this.parentRepo}
                />
              )}
            </GridColumn>
          </Grid>
        </Page>
        <Sidebar
          cards={this.state.cards}
          repoName={this.settings.repoName}
          onOpenPath={this.onOpenPath}
          onOpenFile={this.onOpenFile}
          files={this.state.files}
        />
      </div>
    );
  }
}
