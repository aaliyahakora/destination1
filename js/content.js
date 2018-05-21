import Spinner from "@atlaskit/spinner";
import React from "react";

import makeRequest, { getQuery } from "./request";

const pathPattern = /src\/[^/]+\/(.+)/;
const getPathFromHref = href => pathPattern.exec(href)[1];

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { content: null, isLoading: true };

    const { path } = this.props;
    if (path) this.loadContent(path);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      this.setState({ isLoading: true, content: null });
      this.loadContent(nextProps.path);
    }
  }

  componentDidUpdate() {
    if (window.MathJax.Hub) {
      window.MathJax.Hub.Typeset();
    }
    if (this.content) {
      this.content.addEventListener("click", e => {
        const el = e.target;
        if (el.tagName !== "A") {
          return;
        }

        e.preventDefault();
        if (this.props.onOpenPath) {
          this.props.onOpenPath(getPathFromHref(el.href));
        }
      });
    }
  }

  loadContent = path => {
    makeRequest({
      url: `/2.0/repositories/${this.props.repoName}/src/master/${path}?format=rendered`
    })
      .then(res => {
        this.setState({
          content: res.html,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 40
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
        ref={c => (this.content = c)}
        dangerouslySetInnerHTML={{ __html: this.state.content }}
      />
    );
  }
}
