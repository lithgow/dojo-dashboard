import React from "react";
import Box from "@material-ui/core/Box";
import * as GitHubApi from './GitHubApi'
import * as unzipper from "unzipper";
import {getRaw} from "./GitHubApi";
import GitHubTestResults from "./GitHubTestResults";
import GitHubCoverage from "./GitHubCoverage";

class GitHubTestSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testResults: "",
            coverageResults: ""
        };
    }

    componentDidMount() {
        this.getArtifacts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.buildId !== this.props.buildId || prevProps.buildStatus !== this.props.buildStatus) {
            this.getArtifacts();
        }
    }

    getArtifacts() {
        if (this.props.buildId && this.props.buildStatus === 'completed') {
            GitHubApi.get(GitHubApi.artifactsUrlFrom(this.props.url, this.props.buildId))
                .then(response => {
                    const testResultsArtifact = response.json.artifacts.find(artifact => artifact.name === "test-results");
                    if (testResultsArtifact) {
                        this.getZipArtifact(testResultsArtifact.archive_download_url);
                    }
                })
        }
    }

    getZipArtifact(artifactUrl) {
        getRaw(artifactUrl).then(response => {
            response.arrayBuffer().then(
                (zip) => {
                    this.unpackZip(zip);
                }
            )
        });
    }

    async unpackZip(zip) {
        const buffer = new Buffer(zip);
        const directory = await unzipper.Open.buffer(buffer);

        this.unpackFile(directory, 'test-results.json').then( testResults => {
            this.setState({ testResults: testResults });
        });

        this.unpackFile(directory, 'jacocoTestReport.xml').then( coverageResults => {
            this.setState({ coverageResults: coverageResults });
        });
    }

    async unpackFile(directory, filename) {
        const file = directory.files.find(d => d.path === filename);
        const content = await file.buffer();
        return content.toString();
    }

    render() {
        return (
            <Box display="flex" alignItems="center">
                <GitHubTestResults json={this.state.testResults}/>
                <GitHubCoverage xml={this.state.coverageResults}/>
            </Box>
        );
    }
}

export default GitHubTestSummary;