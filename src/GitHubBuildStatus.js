import React from "react";

class GitHubBuildStatus extends React.Component {
    render() {
        let cacheBust = new Date().getTime();
        let buildStatusBadgeUrl = this.props.url + "/workflows/build/badge.svg?" + cacheBust;
        return (
            <span>
                <img src={buildStatusBadgeUrl}
                     alt=""
                     onError={(e) => {e.target.onerror = null; e.target.src="no-build-status-badge.svg"}}/>
            </span>
        );
    }
}

export default GitHubBuildStatus;