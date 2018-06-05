import React from "react";

import Button from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";

import PageGrid from "./page-grid";
import SettingsModal from "./settings-modal";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOpen: false
    };
  }

  componentDidMount() {
    window.AP.sizeToParent();
  }

  closeSettings = () => {
    this.setState({ settingsOpen: false });
  };

  openSettings = () => {
    this.setState({ settingsOpen: true });
  };

  render() {
    const { user, parentRepo, app, settings } = this.props;

    return (
      <PageGrid>
        <PageHeader
          breadcrumbs={
            <BreadcrumbsStateless>
              <BreadcrumbsItem text={parentRepo.repoName.split("/")[0]} />
              <BreadcrumbsItem text={parentRepo.repoName.split("/")[1]} />
              <BreadcrumbsItem text="Setup" />
            </BreadcrumbsStateless>
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 40
          }}
        >
          <div style={{ margin: "15px" }}>
            <h3>Work more collaboratively and get more done with wikis</h3>
          </div>
          <div>
            This is some longer text that goes underneath the title text. It
            should say something specific about what a wiki is and how teams
            might like to use them. That would be super cool. You know what
            else? We could even put a screenshot or animated gif showing an
            example of a wiki in action!
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Button
              appearance="primary"
              onClick={this.openSettings}
              isDisabled={!user.userIsAdmin}
            >
              Configure
            </Button>
          </div>
          {user.userIsAdmin === "false" && (
            <small>
              Please contact the repository admin to configure the Wiki
            </small>
          )}
          {this.state.settingsOpen && (
            <SettingsModal
              settings={settings}
              closeSettings={this.closeSettings}
              app={app}
              parentRepo={parentRepo}
            />
          )}
        </div>
      </PageGrid>
    );
  }
}
