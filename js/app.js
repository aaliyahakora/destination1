import React from 'react';

import { SettingsProvider } from './settings';
import SettingsModal from './settings-modal';
import makeRequest from './request';
import { parseQuery } from './util';
import Wiki from './wiki';
import ZeroState from './zero-state';

const getSettings = () => {
  const { settings, parentRepo } = parseQuery();
  if (!settings || !settings.repoName) {
    return {
      baseDir: '/',
      index: 'Home.md',
      isConfigured: false,
      repoName: parentRepo && parentRepo.repoName,
    };
  }

  return {
    ...settings,
    isConfigured: true,
  };
};

export default class extends React.Component {
  state = {
    ...getSettings(),
    // eslint-disable-next-line react/no-unused-state
    isOpen: false,
    // eslint-disable-next-line react/no-unused-state
    openSettings: () => this.toggleSettings(true),
    // eslint-disable-next-line react/no-unused-state
    closeSettings: () => this.toggleSettings(false),
    // eslint-disable-next-line react/no-unused-state
    saveSettings: settings => this.saveSettings(settings),
  };

  toggleSettings = isOpen => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isOpen });
  };

  saveSettings = settings => {
    const { parentRepo, app } = parseQuery();

    const data = new FormData();
    data.append('repoName', settings.repoName);
    data.append('baseDir', settings.baseDir);
    data.append('index', settings.index);

    makeRequest({
      url: `/2.0/repositories/{}/${parentRepo.repoUuid}/properties/${
        app.appKey
      }/settings`,
      type: 'PUT',
      data,
    }).then(() => {
      this.toggleSettings(false);
      this.setState({
        ...settings,
        isConfigured: true,
      });
    });
  };

  render() {
    const { parentRepo, user, app } = parseQuery();
    user.userIsAdmin = user.userIsAdmin === 'true';
    const { isConfigured } = this.state;

    return (
      <SettingsProvider value={this.state}>
        <div style={{ display: 'flex' }}>
          {!isConfigured ? (
            <ZeroState user={user} parentRepo={parentRepo} />
          ) : (
            <Wiki app={app} parentRepo={parentRepo} user={user} />
          )}
        </div>
        <SettingsModal />
      </SettingsProvider>
    );
  }
}
