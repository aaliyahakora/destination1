import React, { Fragment } from 'react';

import Content from './content';
import PageGrid from './page-grid';
import Header from './header';
import SettingsModal, { SettingsState } from './settings-modal';
import Sidebar from './sidebar';
import makeRequest from './request';
import { AppType, RepositoryType, SettingsType, UserType } from './types';
import { flattenTree } from './util';

const basename = /^(.+)\..+$/;

const getPath = settings => {
  const { baseDir, index } = settings;
  const base = baseDir.replace(/^\/|\/$/g, '');
  return `${base}/${index}`;
};

export default class extends React.Component {
  static propTypes = {
    app: AppType,
    parentRepo: RepositoryType,
    settings: SettingsType,
    user: UserType,
  };

  state = {
    path: getPath(this.props.settings),
    cards: [],
    files: [],
  };

  componentDidMount() {
    window.AP.env.sizeToParent();
    this.getWikiFiles();
  }

  getWikiFiles = () => {
    makeRequest({
      url: `/internal/repositories/${
        this.props.settings.repoName
      }/tree/master/`,
    }).then(tree => {
      const fileTree = flattenTree(tree[0]);
      const cards = fileTree.filter(x => x.name.startsWith('cards'));
      this.setState({
        files: fileTree,
        cards,
      });
    });
  };

  onOpenFile = file => {
    this.setState({
      path: file.name,
    });
  };

  onOpenPath = path => {
    // look for exact path in our file list
    const exactFile = this.state.files.find(
      file => encodeURI(file.name) === path
    );
    if (exactFile) {
      this.setState({
        path: exactFile.name,
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
        path: almostFile.name,
      });
    }
  };

  render() {
    const { app, parentRepo, settings, user } = this.props;
    return (
      <Fragment>
        <PageGrid>
          <Header
            user={user}
            settings={settings}
            parentRepo={parentRepo}
            app={app}
            path={this.state.path}
            onCloseSettings={this.closeSettings}
            onOpenSettings={this.openSettings}
          />
          <Content
            repoName={settings.repoName}
            path={this.state.path}
            onOpenPath={this.onOpenPath}
          />
          <SettingsState>
            {({ isOpen }) =>
              isOpen && (
                <SettingsModal
                  settings={settings}
                  app={app}
                  parentRepo={parentRepo}
                />
              )
            }
          </SettingsState>
        </PageGrid>
        <Sidebar
          cards={this.state.cards}
          repoName={settings.repoName}
          onOpenPath={this.onOpenPath}
          onOpenFile={this.onOpenFile}
          files={this.state.files}
        />
      </Fragment>
    );
  }
}
