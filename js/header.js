import PageHeader from "@atlaskit/page-header";
import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import React from "react";

import CloneModalButton from "./clone-button";

export default class extends React.Component {
  render() {
    const {
      onOpenSettings,
      user,
      closeSettings,
      settings,
      parentRepo,
      app,
      path
    } = this.props;

    return (
      <PageHeader
        breadcrumbs={
          <BreadcrumbsStateless>
            <BreadcrumbsItem text={parentRepo.repoName.split("/")[0]} />
            <BreadcrumbsItem text={parentRepo.repoName.split("/")[1]} />
          </BreadcrumbsStateless>
        }
        actions={
          <ButtonGroup>
            <CloneModalButton
              origin={app.origin}
              repo={parentRepo}
              user={user}
              settings={settings}
            >
              Clone
            </CloneModalButton>
            <Button
              href={`${app.origin}/${
                settings.repoName
              }/src/master/${path}?mode=edit&spa=0&fileviewer=file-view-default`}
              target="_blank"
            >
              Edit
            </Button>
            <Button onClick={onOpenSettings}>Settings</Button>
          </ButtonGroup>
        }
      />
    );
  }
}
