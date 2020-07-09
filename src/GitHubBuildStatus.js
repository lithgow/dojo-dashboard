import React from "react";

class GitHubBuildStatus extends React.Component {
    render() {
        let buildStatusBadgeUrl = "no-build-status-badge.svg";
        if (this.props.url) {
            const cacheBust = new Date().getTime();
            buildStatusBadgeUrl = `${this.props.url}?${cacheBust}`;
        }
        return (
            <img src={buildStatusBadgeUrl} alt=""/>
        );
    }
}

export default GitHubBuildStatus;