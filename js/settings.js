import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { RepositoryType, SettingsType } from './types';

export default class extends React.Component {
  static propTypes = {
    parentRepo: RepositoryType,
    onSubmit: PropTypes.func,
    settings: SettingsType,
  };

  state = {
    repoName: this.props.parentRepo.repoName
      ? this.props.parentRepo.repoName
      : '',
    baseDir: this.props.settings ? this.props.settings.baseDir : '/',
    index: this.props.settings ? this.props.settings.index : '',
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
        <form
          onSubmit={this.onSubmit}
          ref={f => {
            this.form = f;
          }}
        >
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
