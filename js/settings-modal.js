import React from "react";
import ModalDialog from "@atlaskit/modal-dialog";

import Settings from "./settings";

export default class extends React.Component {
	saveForm = () => {
		if (this.settings) {
			this.settings.handleSubmit();
		}
	};

	render() {
		const { closeSettings, settings, parentRepo, app } = this.props;
		const actions = [
			{ text: "Save", onClick: this.saveForm },
			{ text: "Cancel", onClick: closeSettings }
		];

		return (
			<ModalDialog heading="Settings" onClose={closeSettings} actions={actions}>
				<Settings
					settings={settings}
					closeSettings={closeSettings}
					app={app}
					parentRepo={parentRepo}
					ref={s => {this.settings = s}}
				/>
			</ModalDialog>
		);
	}
}
