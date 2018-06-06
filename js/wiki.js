import React, { Fragment } from "react";

import Content from "./content";
import PageGrid from "./page-grid";
import Header from "./header";
import SettingsModal from "./settings-modal";
import Sidebar from "./sidebar";
import makeRequest from "./request";
import { flattenTree } from "./util";

const basename = /^(.+)\..+$/;

export default class extends React.Component {
    constructor(props) {
        super(props);
        const { parentRepo, user, app, settings } = { ...this.props };
        this.parentRepo = parentRepo;
        this.user = user;
        this.app = app;
        this.settings = settings;
        // Strip leading and trailing slashes
        const baseDir = this.props.settings.baseDir.replace(/^\/|\/$/g, '');
        this.state = {
            path: `${baseDir}/${this.props.settings.index}`,
            settingsOpen: false,
            files: [],
            cards: []
        };

        this.getWikiFiles();
    }

    componentDidMount() {
        window.AP.sizeToParent();
    }

    getWikiFiles = () => {
        makeRequest({
            url: `/internal/repositories/${this.settings.repoName}/tree/master/`
        }).then(tree => {
            const fileTree = flattenTree(tree[0]);
            const cards = fileTree.filter(x => x.name.startsWith("cards"));
            this.setState({
                files: fileTree,
                cards
            });
        });
    };

    closeSettings = () => {
        this.setState({ settingsOpen: false });
    };

    openSettings = () => {
        this.setState({ settingsOpen: true });
    };

    onOpenFile = file => {
        this.setState({
            path: file.name
        });
    };

    onOpenPath = path => {
        // look for exact path in our file list
        const exactFile = this.state.files.find(
            file => encodeURI(file.name) === path
        );
        if (exactFile) {
            this.setState({
                path: exactFile.name
            });
            return;
        }
        // check without extensions
        const almostFile = this.state.files.find(file => {
            const match = basename.exec(encodeURI(file.name));
            return match && match[1] === path;
        });

        if (almostFile) {
            this.setState({
                path: almostFile.name
            });
        }
    };

    render() {
        return (
            <Fragment>
                <PageGrid>
                    <Header
                        user={this.user}
                        settings={this.settings}
                        parentRepo={this.parentRepo}
                        app={this.app}
                        path={this.state.path}
                        onCloseSettings={this.closeSettings}
                        onOpenSettings={this.openSettings}
                    />
                    <Content
                        repoName={this.settings.repoName}
                        path={this.state.path}
                        onOpenPath={this.onOpenPath}
                    />
                    {this.state.settingsOpen && (
                        <SettingsModal
                            settings={this.settings}
                            closeSettings={this.closeSettings}
                            app={this.app}
                            parentRepo={this.parentRepo}
                        />
                    )}
                </PageGrid>
                <Sidebar
                    cards={this.state.cards}
                    repoName={this.settings.repoName}
                    onOpenPath={this.onOpenPath}
                    onOpenFile={this.onOpenFile}
                    files={this.state.files}
                />
            </Fragment>
        );
    }
}
