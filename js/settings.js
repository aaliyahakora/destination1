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

  onSaved = () => {
    this.setState({saving: false})
  }

  handleSubmit = () => {
    this.setState({ saving: true });
    const formData = new FormData(this.form.current);
    const {parentRepo, app, closeSettings} = this.props;

    return makeRequest({
      url: `/2.0/repositories/{}/${parentRepo.repoUuid}/properties/${
        app.appKey
      }/settings`,
      type: "PUT",
      data: formData
    }).then(res => {
      this.setState({ saving: false });
      closeSettings();
    });
  };

  render() {
    const { title, text, settings } = this.props;
    return (
      <form
        ref={this.form}
        onSubmit={this.handleSubmit}
        style={{ paddingBottom: "15px" }}
      >
        <h2>{title || "Settings"}</h2>
        {text && <div>{text}</div>}
        <div className="ak-field-group">
          <label htmlFor="repoName">Wiki Repository Name</label>
          <input
            type="text"
            className="ak-field-text ak-field__size-medium"
            id="repoName"
            name="repoName"
            placeholder="eg. bitbucket/bitbucket.wiki"
            defaultValue={settings.repoName}
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
            defaultValue={settings.index}
          />
        </div>
      </form>
    );
  }
}
