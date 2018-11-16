import React from 'react';

export const SettingsContext = React.createContext({
  repoName: '',
  baseDir: '',
  index: '',

  isOpen: false,
  openSettings: () => {},
  closeSettings: () => {},
  saveSettings: () => {},
});
export const SettingsProvider = SettingsContext.Provider;

export default SettingsContext.Consumer;
