import PropTypes from 'prop-types';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button, { ButtonGroup } from '@atlaskit/button';
import React from 'react';

import CloneModalButton from './clone-button';
import { SettingsState } from './settings-modal';
import { AppType, RepositoryType, SettingsType, UserType } from './types';

export default class extends React.Component {
  static propTypes = {
    app: AppType,
    parentRepo: RepositoryType,
    path: PropTypes.string,
    settings: SettingsType,
    user: UserType,
  };

  render() {
    const { user, settings, parentRepo, app, path } = this.props;

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
            <SettingsState>
              {({ openSettings }) => (
                <Button onClick={openSettings}>Settings</Button>
              )}
            </SettingsState>
          </ButtonGroup>
        }
      />
    );
  }
}
