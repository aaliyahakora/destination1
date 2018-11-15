import React from 'react';
import ModalDialog from '@atlaskit/modal-dialog';

import makeRequest from './request';
import Settings from './settings';
import { AppType, RepositoryType, SettingsType } from './types';

const SettingsContext = React.createContext({
  isOpen: false,
  openSettings: () => {},
  closeSettings: () => {},
});
export const SettingsState = SettingsContext.Consumer;
export const SettingsToggle = SettingsContext.Provider;

export default class extends React.Component {
  static contextType = SettingsContext;

  static propTypes = {
    app: AppType,
    parentRepo: RepositoryType,
    settings: SettingsType,
  };

  saveSettings = () => {
    const { parentRepo, app } = this.props;

    makeRequest({
      url: `/2.0/repositories/{}/${parentRepo.repoUuid}/properties/${
        app.appKey
      }/settings`,
      type: 'PUT',
      data: this.settings.getData(),
    }).then(this.context.closeSettings);
  };

  render() {
    if (!this.context.isOpen) {
      return null;
    }

    const { settings, parentRepo } = this.props;

    const actions = [
      { text: 'Save', onClick: this.saveSettings },
      { text: 'Cancel', onClick: this.context.closeSettings },
    ];

    return (
      <ModalDialog
        heading="Settings"
        onClose={this.context.closeSettings}
        actions={actions}
      >
        <Settings
          onSubmit={this.saveSettings}
          parentRepo={parentRepo}
          ref={s => {
            this.settings = s;
          }}
          settings={settings}
        />
      </ModalDialog>
    );
  }
}
