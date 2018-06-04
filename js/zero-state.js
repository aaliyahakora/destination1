import React, { Fragment } from "react";
import Button from "@atlaskit/button";

import PageHeader from "@atlaskit/page-header";
import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Settings from "./settings";

export default class extends React.Component {
  render() {
    const {user, parentRepo} = this.props;

    return (
      <Fragment>
        <PageHeader
          breadcrumbs={
            <BreadcrumbsStateless>
              <BreadcrumbsItem text={parentRepo.repoName.split("/")[0]} />
              <BreadcrumbsItem text={parentRepo.repoName.split("/")[1]} />
              <BreadcrumbsItem text="Setup" />
            </BreadcrumbsStateless>
          }
        />
        {user.userIsAdmin === "true" ? (
          <Settings title="Setup">
            <div><h3>Work more collaboratively and get more done with wikis</h3></div>
          </Settings>
        ) : (
          <div>Contact your repository admin to set this up </div>
        )}
      </Fragment>
    );
  }
}
