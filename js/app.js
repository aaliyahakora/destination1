import React from 'react';

import SettingsModal, { SettingsState, SettingsToggle } from './settings-modal';
import { parseQuery } from './util';
import Wiki from './wiki';
import ZeroState from './zero-state';

export default class extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    isOpen: false,
    // eslint-disable-next-line react/no-unused-state
    openSettings: () => this.toggleSettings(true),
    // eslint-disable-next-line react/no-unused-state
    closeSettings: () => this.toggleSettings(false),
  };

  toggleSettings = isOpen => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isOpen });
  };

  render() {
    const { parentRepo, user, app, settings } = parseQuery();
    user.userIsAdmin = user.userIsAdmin === 'true';

    return (
      <SettingsToggle value={this.state}>
        <div style={{ display: 'flex' }}>
          {!settings || !settings.repoName ? (
            <ZeroState user={user} parentRepo={parentRepo} />
          ) : (
            <Wiki
              app={app}
              parentRepo={parentRepo}
              settings={settings}
              user={user}
            />
          )}
        </div>
        <SettingsState>
          {({ isOpen }) =>
            isOpen && (
              <SettingsModal
                settings={settings}
                app={app}
                parentRepo={parentRepo}
              />
            )
          }
        </SettingsState>
      </SettingsToggle>
    );
  }
}
