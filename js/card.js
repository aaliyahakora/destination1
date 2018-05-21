import React from "react";
import { Expander } from "@atlassian/bitkit-sidebar";

export default props => {
  const label = <span>{props.title}</span>;
  const isCollapsed = props.initialIsCollapsed
    ? true
    : false;
  return (
    <div style={{ marginTop: "12px" }}>
      <Expander
        initialIsCollapsed={isCollapsed}
        icon={props.icon}
        label={label}
      >
        {props.children}
      </Expander>
    </div>
  );
};
