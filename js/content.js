import Spinner from '@atlaskit/spinner';
import PropTypes from 'prop-types';
import React from 'react';

import makeRequest from './request';

const pathPattern = /src\/[^/]+\/(.+)/;
const getPathFromHref = href => pathPattern.exec(href)[1];

export default class extends React.Component {
  static propTypes = {
    // cards: PropTypes.arrayOf(CardType),
    // files: PropTypes.arrayOf(FileType),
    // onOpenFile: PropTypes.func,
    onOpenPath: PropTypes.func,
    repoName: PropTypes.string,
    path: PropTypes.string,
  };

  static defaultProps = {
    onOpenPath: () => {},
  };

  state = {
    content: null,
    isLoading: true,
  };

  componentDidMount() {
    if (this.props.path) {
      this.loadContent(this.props.path);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.path !== prevProps.path) {
      this.loadContent(this.props.path);
    }

    if (!this.state.isLoading && prevState.isLoading) {
      if (this.state.content && window.MathJax.Hub) {
        window.MathJax.Hub.Typeset();
      }
    }
  }

  getContentRef = content => {
    if (this.content) {
      this.content.removeEventListener('click', this.catchClicks);
    }
    this.content = content;
    if (this.content) {
      this.content.addEventListener('click', this.catchClicks);
    }
  };

  catchClicks = e => {
    const el = e.target;
    if (el.tagName !== 'A') {
      return;
    }

    e.preventDefault();
    this.props.onOpenPath(getPathFromHref(el.href));
  };

  loadContent = path => {
    this.setState({
      isLoading: true,
      content: null,
    });

    makeRequest({
      url: `/2.0/repositories/${
        this.props.repoName
      }/src/master/${path}?format=rendered`,
    })
      .then(res => {
        this.setState({
          content: res.html,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
          }}
        >
          <Spinner delay={0} size="medium" />
        </div>
      );
    }

    if (!this.state.content) {
      return <div>Nothing found</div>;
    }

    return (
      <div
        ref={this.getContentRef}
        dangerouslySetInnerHTML={{ __html: this.state.content }}
      />
    );
  }
}
