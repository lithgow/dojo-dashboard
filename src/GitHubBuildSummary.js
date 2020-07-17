import React from "react";
import Box from "@material-ui/core/Box";
import BuildIcon from '@material-ui/icons/Build';
import StyledBadge from "./StyledBadge";
import * as GitHubApi from './GitHubApi'
import GitHubTestSummary from "./GitHubTestSummary";

class GitHubBuildSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getBuilds(),
            GitHubApi.refreshInterval
        );
        this.getBuilds();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getBuilds() {
        GitHubApi.get(GitHubApi.workflowsUrlFrom(this.props.url))
            .then(response => {
                if (response.statusOk) {
                    const buildWorkflow = response.json.workflows.find(workflow => workflow.name === "build");
                    if (buildWorkflow) {
                        this.getLatestBuild(buildWorkflow.id);
                    }
                } else {
                    console.log(`Error loading workflows for ${GitHubApi.workflowsUrlFrom(this.props.url)}`);
                    if (response) {
                        console.log(`  ${response.response.status}: ${response.response.statusText}`);
                        console.log(`  ${response.json}`);
                    }
                }
            })
    }

    getLatestBuild(buildWorkflowId) {
        GitHubApi.get(GitHubApi.workflowRunUrlFrom(this.props.url, buildWorkflowId))
            .then(response => {
                const numberOfBuilds = response.json.total_count;
                if (numberOfBuilds > 0) {
                    const buildNumber = response.json.workflow_runs[0].run_number;
                    if (buildNumber !== numberOfBuilds) {
                        console.log(`Build ${buildNumber} wasn't the last of ${numberOfBuilds} builds for ${this.props.url}`);
                    }
                    const buildId = response.json.workflow_runs[0].id;
                    const buildStatus = response.json.workflow_runs[0].status;
                    const buildConclusion = response.json.workflow_runs[0].conclusion;
                    this.setState({
                        numberOfBuilds: numberOfBuilds,
                        lastBuildNumber: buildNumber,
                        lastBuildId: buildId,
                        lastBuildStatus: buildStatus,
                        lastBuildConclusion: buildConclusion
                    });
                }
            })
    }

    render() {
        let buildNumber;
        if (this.state.lastBuildNumber) {
            buildNumber = this.state.lastBuildNumber +
                (this.state.lastBuildNumber !== this.state.numberOfBuilds ? "!":"");
        }
        let buildIconColor = "disabled";
        if (this.state.lastBuildConclusion) {
            buildIconColor = 'action';
        }
        const buildBadgeColor = this.getBuildBadgeColor();

        return (
            <Box display="flex" alignItems="center">
                <StyledBadge badgeContent={buildNumber} color={buildBadgeColor}>
                    <BuildIcon color={buildIconColor}/>
                </StyledBadge>
                <GitHubTestSummary
                    url={this.props.url}
                    buildId={this.state.lastBuildId}
                    buildStatus={this.state.lastBuildStatus}/>
            </Box>
        );
    }

    getBuildBadgeColor() {
        if (this.state.lastBuildConclusion === 'success') return 'secondary';
        return this.state.lastBuildConclusion === "failure" ? 'error' : 'primary';
    }
}

export default GitHubBuildSummary;