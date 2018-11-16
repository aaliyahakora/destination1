import PropTypes from 'prop-types';
import React from 'react';

export default class SettingsForm extends React.Component {
  static propTypes = {
    baseDir: PropTypes.string,
    index: PropTypes.string,
    repoName: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  state = {
    repoName: this.props.repoName,
    baseDir: this.props.baseDir,
    index: this.props.index,
  };

  onInputChange = event => {
    const {
      target: { value, name },
    } = event;
    this.setState({
      [name]: value,
    });
  };

  getData = () => {
    return { ...this.state };
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
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
    );
  }
}
