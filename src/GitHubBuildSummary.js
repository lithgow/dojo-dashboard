import React from "react";
import * as GitHubApi from './GitHubApi'
import GitHubTestSummary from "./GitHubTestSummary";
import GitHubBuildStatus from "./GitHubBuildStatus";

class GitHubBuildSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfBuilds: "?",
            lastBuildNumber: "?",
            lastBuildId: 0,
            buildStatusBadgeUrl: ""
        };
    }

    noResults() {
        this.setState({
            numberOfBuilds: '-',
            lastBuildNumber: '-'
        });
    }

    componentDidMount() {
        GitHubApi.get(GitHubApi.workflowsUrlFrom(this.props.url))
            .then(response => {
                const buildWorkflow = response.json.workflows.find(workflow => workflow.name === "build");
                if (buildWorkflow) {
                    this.setState({buildStatusBadgeUrl: buildWorkflow.badge_url});
                    this.getLatestBuild(buildWorkflow.id);
                } else this.noResults();
            })
    }

    getLatestBuild(buildWorkflowId) {
        GitHubApi.get(GitHubApi.workflowUrlFrom(this.props.url, buildWorkflowId))
            .then(response => {
                const numberOfBuilds = response.json.total_count;
                if (numberOfBuilds > 0) {
                    const buildNumber = response.json.workflow_runs[0].run_number;
                    if (buildNumber !== numberOfBuilds) {
                        console.log(`Build ${buildNumber} wasn't the last of ${numberOfBuilds} builds for ${this.props.url}`);
                    }
                    const buildId = response.json.workflow_runs[0].id;
                    this.setState({
                        numberOfBuilds: numberOfBuilds,
                        lastBuildNumber: buildNumber,
                        lastBuildId: buildId
                    });
                } else this.noResults();
            })
    }

    render() {
        return (
            <span>
                <span> {this.state.lastBuildNumber}{this.state.lastBuildNumber !== this.state.numberOfBuilds ? "(!)":""} </span>
                <GitHubBuildStatus url={this.state.buildStatusBadgeUrl}/>
                {this.state.lastBuildId > 0 &&
                    <GitHubTestSummary url={this.props.url} buildId={this.state.lastBuildId}/>
                }
            </span>
        );
    }
}

export default GitHubBuildSummary;