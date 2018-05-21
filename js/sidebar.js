import React from "react";
import Sidebar from "@atlassian/bitkit-sidebar";

import Card from "./card";
import Content from "./content";
import * as styles from "./sidebar.style";

export default class extends React.Component {
  render() {
    const sidebarIcon = (
      <img
        alt="expand"
        width="16"
        src="http://d33wubrfki0l68.cloudfront.net/27878331ab455d24e169a38ef5289f0de7fcc6e9/8e075/img/sidebar_collapsed.svg"
      />
    );

    // Always render the pages card and map over optional user-defined cards
    const pagesCard = (
      <Card initialIsCollapsed title="Pages">
        <ul style={{ listStyle: "none", padding: 0 }}>
          {this.props.files.map(file => (
            <li
              key={file.name}
              style={{ cursor: "pointer" }}
              onClick={() => this.props.onOpenFile(file)}
            >
              {file.name}
            </li>
          ))}
        </ul>
      </Card>
    );

    const cards = this.props.cards.map(card => {
      const cardTitle = /cards\/(.+)\.(md|mkd|mkdn|mdown|markdown|text|rst)/.exec(
        card.name
      )[1];
      return (
        <Card title={cardTitle} key={card.name}>
          <Content repoName={this.props.repoName} path={card.name} onOpenPath={this.props.onOpenPath} />
        </Card>
      );
    });

    cards.push(pagesCard);

    return (
      <styles.Container>
        <Sidebar
          resizable
          // isCollapsed - # FIXME make this an option?
          icon={sidebarIcon}
          expandedContent={[cards]}
          collapsedWidth={64}
          expandedWidth={264}
          minExpandedWidth={200}
          maxExpandedWidth={400}
        />
      </styles.Container>
    );
  }
}
