import PropTypes from 'prop-types';

export const AppType = PropTypes.exact({
  appKey: PropTypes.string,
  origin: PropTypes.string,
});

export const CardType = PropTypes.exact({
  name: PropTypes.string,
});

export const FileType = PropTypes.exact({
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
});

export const RepositoryType = PropTypes.exact({
  repoName: PropTypes.string,
  repoScm: PropTypes.string,
  repoUuid: PropTypes.string,
});

export const UserType = PropTypes.exact({
  userIsAdmin: PropTypes.bool,
  userName: PropTypes.string,
  userUuid: PropTypes.string,
});
