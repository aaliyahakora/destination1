import PropTypes from 'prop-types';

export const AppType = PropTypes.exact({
  appKey: PropTypes.string,
  origin: PropTypes.string,
});

export const RepositoryType = PropTypes.exact({
  repoName: PropTypes.string,
  repoScm: PropTypes.string,
  repoUuid: PropTypes.string,
});

export const SettingsType = PropTypes.object;

export const UserType = PropTypes.exact({
  userIsAdmin: PropTypes.bool,
  userName: PropTypes.string,
  userUuid: PropTypes.string,
});
