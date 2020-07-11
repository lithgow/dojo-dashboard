import React from "react";
import * as GitHubApi from './GitHubApi'
import GitHubUser from "./GitHubUser";
import GitHubCommitCount from "./GitHubCommitCount";
import GitHubBuildSummary from "./GitHubBuildSummary";
import Card from '@material-ui/core/Card';

class GitHubForks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: new GitHubApi.GitHubApiResponse()
        };
    }

    componentDidMount() {
        GitHubApi.get(GitHubApi.forksUrl)
            .then(response => {
                this.setState({apiResponse: response});
            })
    }

    render() {
        const { statusOk, isLoaded, json, error } = this.state.apiResponse;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (!statusOk) {
            return <div>{json.message}</div>;
        } else {
            return (
                <div>
                    {json.map(fork => (
                        <Card key={fork.owner.login} raised={true} square={true}>
                            <GitHubUser url={fork.owner.url}/>
                            <GitHubCommitCount url={fork.commits_url}/>
                            <GitHubBuildSummary url={fork.url}/>
                        </Card>
                    ))}
                </div>
            );
        }
    }
}

export default GitHubForks;