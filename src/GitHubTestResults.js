import React from "react";

class GitHubTestResults extends React.Component {
    render() {
        let summary = "";
        if (this.props.json) {
            const testResults = JSON.parse(this.props.json);
            summary = `${testResults.tests} ${testResults.passed} ${testResults.failed} ${testResults.skipped}`;
        }
        return (
            <span>{summary}</span>
        );
    }
}

export default GitHubTestResults;