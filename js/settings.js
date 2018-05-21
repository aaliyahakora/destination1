import React from "react";
import ModalDialog from "@atlaskit/modal-dialog";
import Button, { ButtonGroup } from "@atlaskit/button";

import makeRequest from "./request";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false
    };
  }

  handleSubmit = e => {
    this.setState({ saving: true });
    const formData = new FormData(e.target);

    makeRequest({
      url: `/2.0/repositories/{}/${this.props.repoUuid}/properties/${
        this.props.appKey
      }/settings`,
      type: "PUT",
      data: formData
    }).then(res => {
      this.setState({ saving: false });
      this.props.closeSettings();
    });
    e.preventDefault();
    return false;
  };

  render() {
    return (
      <div>
        <ModalDialog heading="Settings" onClose={this.props.closeSettings}>
          <form onSubmit={this.handleSubmit} style={{ paddingBottom: "15px" }}>
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
            <div className="ak-field-group">
              <button
                className="ak-button ak-button__appearance-primary"
                disabled={this.state.saving}
              >
                Save
              </button>
              <button className="ak-button" onClick={this.props.closeSettings}>
                Cancel
              </button>
            </div>
          </form>
        </ModalDialog>
      </div>
    );
  }
}
