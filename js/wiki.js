import React, { Fragment } from 'react';

import Content from './content';
import PageGrid from './page-grid';
import Header from './header';
import { SettingsContext } from './settings';
import Sidebar from './sidebar';
import makeRequest from './request';
import { AppType, RepositoryType, UserType } from './types';
import { flattenTree } from './util';

const basename = /^(.+)\..+$/;

const getPath = ({ baseDir, index }) => {
  const base = baseDir.replace(/^\/|\/$/g, '');
  return base ? `${base}/${index}` : index;
};

export default class extends React.Component {
  static contextType = SettingsContext;

  static propTypes = {
    app: AppType,
    parentRepo: RepositoryType,
    user: UserType,
  };

  state = {
    path: getPath(this.context),
    cards: [],
    files: [],
  };

  componentDidMount() {
    window.AP.env.sizeToParent();
    this.getWikiFiles();
  }

  getWikiFiles = () => {
    makeRequest({
      url: `/internal/repositories/${this.context.repoName}/tree/master/`,
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
      this.setState({ path });
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
    const { app, parentRepo, user } = this.props;
    const { repoName } = this.context;

    return (
      <Fragment>
        <PageGrid>
          <Header
            user={user}
            parentRepo={parentRepo}
            app={app}
            path={this.state.path}
          />
          <Content
            repoName={repoName}
            path={this.state.path}
            onOpenPath={this.onOpenPath}
          />
        </PageGrid>
        <Sidebar
          cards={this.state.cards}
          repoName={repoName}
          onOpenPath={this.onOpenPath}
          onOpenFile={this.onOpenFile}
          files={this.state.files}
        />
      </Fragment>
    );
  }
}
