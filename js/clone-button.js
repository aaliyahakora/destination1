import React from "react";
import Button from "@atlaskit/button";

import {CloneModalDialog} from "@atlassian/bitkit-clone-controls";

export default class extends React.Component {
  state = {
    isOpen: false,
  };

  dismissDialog = () => this.setState({ isOpen: false });

  render() {
    return (
      <div>
        <CloneModalDialog
          onDialogDismissed={this.dismissDialog}
          repository={this.props.repo}
          user={this.props.user}
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

