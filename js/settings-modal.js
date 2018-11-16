import React from 'react';
import ModalDialog from '@atlaskit/modal-dialog';

import { SettingsContext } from './settings';
import SettingsForm from './settings-form';

export default class extends React.Component {
  static contextType = SettingsContext;

  submit = () => {
    if (!this.form) {
      return;
    }

    this.context.saveSettings(this.form.getData());
  };

  render() {
    if (!this.context.isOpen) {
      return null;
    }

    const actions = [
      { text: 'Save', onClick: this.submit },
      { text: 'Cancel', onClick: this.context.closeSettings },
    ];

    return (
      <ModalDialog
        heading="Settings"
        onClose={this.context.closeSettings}
        actions={actions}
      >
        <SettingsForm
          ref={form => {
            this.form = form;
          }}
          baseDir={this.context.baseDir}
          index={this.context.index}
          repoName={this.context.repoName}
          onSubmit={this.submit}
        />
      </ModalDialog>
    );
  }
}
