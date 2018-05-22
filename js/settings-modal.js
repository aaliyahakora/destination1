import React from "react";
import ModalDialog from "@atlaskit/modal-dialog";
import Button, { ButtonGroup } from "@atlaskit/button";

import Settings from "./settings";

export default class extends React.Component {
	saveForm = () => {
		if (this.settings) {
			this.settings.handleSubmit();
		}
	};

	render() {
		const actions = [
			{ text: "Save", onClick: this.saveForm },
			{ text: "Cancel", onClick: this.props.closeSettings }
		];

		return (
			<ModalDialog
				heading="Settings"
				onClose={this.props.closeSettings}
				actions={actions}
			>
				<Settings
					settings={this.props.settings}
					closeSettings={this.props.closeSettings}
					app={this.props.app}
					parentRepo={this.props.parentRepo}
					ref={s => (this.settings = s)}
				/>
			</ModalDialog>
		);
	}
}



//  (
// 	<ButtonGroup>
// 		<button
// 			className="ak-button ak-button__appearance-primary"
// 		>
// 			Save
// 		</button>
// 		<button
// 			className="ak-button"
// 			onClick={this.props.closeSettings}
// 		>
// 			Cancel
// 		</button>
// 	</ButtonGroup>
// );
