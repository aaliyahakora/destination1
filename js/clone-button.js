import React from "react";
import Button from "@atlaskit/button";

import {CloneModalDialog} from "@atlassian/bitkit-clone-controls";


export default class extends React.Component {
  state = {
    isOpen: false,
  };

  dismissDialog = () => this.setState({ isOpen: false });

  render() {
    const originUrl = new URL(this.props.origin);

    const repo = {
      uuid: this.props.repo.repoUuid,
      name: this.props.repo.repoName,
      full_name: this.props.settings.repoName,
      scm: this.props.repo.repoScm,
      links: {
        clone: [
          {
            name: "https",
            href: `https://${this.props.user.userName}@${originUrl.host}/${
              this.props.settings.repoName
            }.${this.props.repo.repoScm}`
          },
          {
            name: "ssh",
            href: `git@${originUrl.host}:${this.props.repo.repoName}.${this.props.repo.repoScm}`
          }
        ]
      }
    };

    const user = {
      uuid: this.props.user.userUuid,
      username: this.props.user.userName
    };

    return (
      <div>
        <CloneModalDialog
          onDialogDismissed={this.dismissDialog}
          repository={repo}
          user={user}
          defaultProtocol='https'
          isOpen={this.state.isOpen}
        />
        <Button
          onClick={() =>
            this.setState({
              isOpen: true,
            })
          }
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}

