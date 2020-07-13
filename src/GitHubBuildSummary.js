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
            numberOfBuilds: "?",
            lastBuildNumber: "?",
            lastBuildId: 0,
            lastBuildConclusion: ""
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
                    this.getLatestBuild(buildWorkflow.id);
                } else this.noResults();
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
                    const buildConclusion = response.json.workflow_runs[0].conclusion;
                    this.setState({
                        numberOfBuilds: numberOfBuilds,
                        lastBuildNumber: buildNumber,
                        lastBuildId: buildId,
                        lastBuildConclusion: buildConclusion
                    });
                } else this.noResults();
            })
    }

    render() {
        const buildNumber = this.state.lastBuildNumber +
            (this.state.lastBuildNumber !== this.state.numberOfBuilds ? "!":"");
        const buildIconColor = this.state.lastBuildConclusion === "failure" ? 'error' : 'action';
        const buildBadgeColor = this.state.lastBuildConclusion === "failure" ? 'error' : 'primary';

        return (
            <Box display="flex" alignItems="center">
                <StyledBadge badgeContent={buildNumber} color={buildBadgeColor}>
                    <BuildIcon color={buildIconColor}/>
                </StyledBadge>
                {this.state.lastBuildId > 0 &&
                    <GitHubTestSummary url={this.props.url} buildId={this.state.lastBuildId}/>
                }
            </Box>
        );
    }
}

export default GitHubBuildSummary;