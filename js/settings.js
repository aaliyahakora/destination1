import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { RepositoryType, SettingsType } from './types';

const getRepoName = (settings, parentRepo) => {
  if (settings && settings.repoName) {
    return settings.repoName;
  }
  if (parentRepo && parentRepo.repoName) {
    return parentRepo.repoName;
  }
  return '';
};
const getBaseDir = settings => (settings && settings.baseDir) || '/';
const getIndex = settings => (settings && settings.index) || 'Home.md';

export default class extends React.Component {
  static propTypes = {
    parentRepo: RepositoryType,
    onSubmit: PropTypes.func,
    settings: SettingsType,
  };

  state = {
    repoName: getRepoName(this.props.settings, this.props.parentRepo),
    baseDir: getBaseDir(this.props.settings),
    index: getIndex(this.props.settings),
  };

  onInputChange = event => {
    const {
      target: { value, name },
    } = event;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  getData = () => {
    const data = new FormData();
    Object.entries(this.state).forEach(([key, value]) => {
      data.append(key, value);
    });
    return data;
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="ak-field-group">
            <label htmlFor="repoName">Wiki Repository Name</label>
            <input
              type="text"
              className="ak-field-text ak-field__size-medium"
              id="repoName"
              name="repoName"
              placeholder="eg. bitbucket/bitbucket.wiki"
              value={this.state.repoName}
              onChange={this.onInputChange}
            />
          </div>

          <div className="ak-field-group">
            <label htmlFor="baseDir">Base Directory</label>
            <input
              placeholder="/"
              type="text"
              className="ak-field-text ak-field__size-medium"
              id="baseDir"
              name="baseDir"
              value={this.state.baseDir}
              onChange={this.onInputChange}
            />
          </div>

          <div className="ak-field-group">
            <label htmlFor="index">Index Page</label>
            <input
              placeholder="Home.md"
              type="text"
              className="ak-field-text ak-field__size-medium"
              id="index"
              name="index"
              value={this.state.index}
              onChange={this.onInputChange}
            />
          </div>
          <input type="submit" style={{ visibility: 'hidden' }} />
        </form>
      </Fragment>
    );
  }
}
