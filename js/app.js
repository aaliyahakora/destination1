import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import PageHeader from "@atlaskit/page-header";
import React from "react";

import CloneModalButton from "./clone-button";
import Content from "./content";
import Sidebar from "./sidebar";
import SettingsModal from "./settings";
import makeRequest, { getQuery } from "./request";
import { flattenTree, parseSettings } from "./util";

// FIXME - generalize this
const repoName = getQuery("repo");
const repoUuid = getQuery("repoUuid");
const repoScm = getQuery("repoScm");
const appKey = getQuery("appKey");
const userName = getQuery("userName");
const origin = getQuery("xdm_e");
const userUuid = getQuery("userUuid");

const settings = parseSettings(getQuery("settings"));

const originUrl = new URL(origin);

const basename = /^(.+)\..+$/;

const repo = {
  uuid: repoUuid,
  name: repoName,
  full_name: settings.repoName,
  scm: repoScm,
  links: {
    clone: [
      {
        name: "https",
        href: `https://${userName}@${originUrl.host}/${
          settings.repoName
        }.${repoScm}`
      },
      {
        name: "ssh",
        href: `git@${originUrl.host}:${settings.repoName}.${repoScm}`
      }
    ]
  }
};

const user = {
  uuid: userUuid,
  username: userName
};

export default class extends React.Component {
  constructor(props) {
    super(props);
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
      url: `/internal/repositories/${settings.repoName}/tree/master/`
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
                    <BreadcrumbsItem text={repoName.split("/")[0]} />
                    <BreadcrumbsItem text={repoName.split("/")[1]} />
                  </BreadcrumbsStateless>
                }
                actions={
                  <ButtonGroup>
                    <CloneModalButton repo={repo} user={user}>
                      Clone
                    </CloneModalButton>
                    <Button
                      href={`${origin}/${settings.repoName}/src/master/${
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
              <Content repoName={settings.repoName} path={this.state.path} onOpenPath={this.onOpenPath} />
              {this.state.settingsOpen && (
                <SettingsModal
                  closeSettings={this.closeSettings}
                  settings={settings}
                  appKey={appKey}
                  repoUuid={repoUuid}
                />
              )}
            </GridColumn>
          </Grid>
        </Page>
        <Sidebar
          cards={this.state.cards}
          repoName={settings.repoName}
          onOpenPath={this.onOpenPath}
          onOpenFile={this.onOpenFile}
          files={this.state.files}
        />
      </div>
    );
  }
}
