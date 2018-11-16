import PropTypes from 'prop-types';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button, { ButtonGroup } from '@atlaskit/button';
import React from 'react';

import CloneModalButton from './clone-button';
import Settings from './settings';
import { AppType, RepositoryType, UserType } from './types';

export default class extends React.Component {
  static propTypes = {
    app: AppType,
    parentRepo: RepositoryType,
    path: PropTypes.string,
    repoName: PropTypes.string,
    user: UserType,
  };

  render() {
    const { user, repoName, parentRepo, app, path } = this.props;

    return (
      <PageHeader
        breadcrumbs={
          <BreadcrumbsStateless>
            <BreadcrumbsItem text={parentRepo.repoName.split('/')[0]} />
            <BreadcrumbsItem text={parentRepo.repoName.split('/')[1]} />
            <BreadcrumbsItem text="wiki" />
          </BreadcrumbsStateless>
        }
        actions={
          <ButtonGroup>
            <CloneModalButton
              origin={app.origin}
              repo={parentRepo}
              user={user}
              repoName={repoName}
            >
              Clone
            </CloneModalButton>
            <Button
              href={`${
                app.origin
              }/${repoName}/src/master/${path}?mode=edit&spa=0&fileviewer=file-view-default`}
              target="_blank"
            >
              Edit
            </Button>
            <Settings>
              {({ openSettings }) => (
                <Button onClick={openSettings}>Settings</Button>
              )}
            </Settings>
          </ButtonGroup>
        }
      />
    );
  }
}
