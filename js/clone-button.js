import React from "react";
import Button from "@atlaskit/button";

import {CloneModalDialog} from "@atlassian/bitkit-clone-controls";


export default class extends React.Component {
  state = {
    isOpen: false,
  };

  dismissDialog = () => this.setState({ isOpen: false });

  render() {
    const {origin, repo, settings, user, children} = this.props
    const originUrl = new URL(origin);

    const repository = {
      uuid: repo.repoUuid,
      name: repo.repoName,
      full_name: settings.repoName,
      scm: repo.repoScm,
      links: {
        clone: [
          {
            name: "https",
            href: `https://${user.userName}@${originUrl.host}/${
              settings.repoName
            }.${repo.repoScm}`
          },
          {
            name: "ssh",
            href: `git@${originUrl.host}:${repo.repoName}.${repo.repoScm}`
          }
        ]
      }
    };

    const u = {
      uuid: user.userUuid,
      username: user.userName
    };

    return (
      <div>
        <CloneModalDialog
          onDialogDismissed={this.dismissDialog}
          repository={repository}
          user={u}
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
          {children}
        </Button>
      </div>
    );
  }
}

