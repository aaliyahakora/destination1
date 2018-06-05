import React from "react";

import Page, { Grid, GridColumn } from "@atlaskit/page";

export default class extends React.Component {
	render() {
		return (
			<Page>
				<Grid spacing="compact">
					<GridColumn medium={12} />
					{this.props.children}
				</Grid>
			</Page>
		);
	}
}
