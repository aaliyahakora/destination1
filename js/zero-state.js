import React from 'react';

import Button from '@atlaskit/button';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

import PageGrid from './page-grid';
import Settings from './settings';
import { RepositoryType, UserType } from './types';

export default class extends React.Component {
  static propTypes = {
    parentRepo: RepositoryType,
    user: UserType,
  };

  componentDidMount() {
    window.AP.env.sizeToParent();
  }

  render() {
    const { user, parentRepo } = this.props;

    return (
      <PageGrid>
        <PageHeader
          breadcrumbs={
            <BreadcrumbsStateless>
              <BreadcrumbsItem text={parentRepo.repoName.split('/')[0]} />
              <BreadcrumbsItem text={parentRepo.repoName.split('/')[1]} />
              <BreadcrumbsItem text="wiki" />
            </BreadcrumbsStateless>
          }
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
          }}
        >
          <h3>Work more collaboratively and get more done with wikis</h3>
          <p>
            This is some longer text that goes underneath the title text. It
            should say something specific about what a wiki is and how teams
            might like to use them. That would be super cool. You know what
            else? We could even put a screenshot or animated gif showing an
            example of a wiki in action!
          </p>
          <p>
            <Settings>
              {({ openSettings }) => (
                <Button
                  appearance="primary"
                  onClick={openSettings}
                  isDisabled={!user.userIsAdmin}
                >
                  Configure
                </Button>
              )}
            </Settings>
          </p>
          {user.userIsAdmin === 'false' && (
            <small>
              Please contact the repository admin to configure the Wiki
            </small>
          )}
        </div>
      </PageGrid>
    );
  }
}
