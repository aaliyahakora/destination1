import React from 'react';

import { SettingsToggle } from './settings-modal';
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
    const props = {
      user,
      settings,
      app,
      parentRepo,
    };

    return (
      <SettingsToggle value={this.state}>
        <div style={{ display: 'flex' }}>
          {!settings || !settings.repoName ? (
            <ZeroState {...props} />
          ) : (
            <Wiki {...props} />
          )}
        </div>
      </SettingsToggle>
    );
  }
}
