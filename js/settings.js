import React from "react";

import makeRequest from "./request";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      saving: false
    };
  }

  handleSubmit = () => {
    this.setState({ saving: true });
    const formData = new FormData(this.form);

    return makeRequest({
      url: `/2.0/repositories/{}/${this.props.parentRepo.repoUuid}/properties/${
        this.props.app.appKey
      }/settings`,
      type: "PUT",
      data: formData
    }).then(res => {
      this.setState({ saving: false });
      this.props.closeSettings();
    });
  };

  render() {
    return (
      <form ref={this.form} onSubmit={this.handleSubmit} style={{ paddingBottom: "15px" }}>
        <h2>Settings</h2>
        <div className="ak-field-group">
          <label htmlFor="repoName">Wiki Repository Name</label>
          <input
            type="text"
            className="ak-field-text ak-field__size-medium"
            id="repoName"
            name="repoName"
            placeholder="eg. bitbucket/bitbucket.wiki"
            defaultValue={this.props.settings.repoName}
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
            defaultValue={this.props.settings.index}
          />
        </div>
      </form>
    );
  }
}


