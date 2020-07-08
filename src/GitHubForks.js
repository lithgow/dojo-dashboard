import React from "react";
import * as GitHubApi from './GitHubApi'
import GitHubUser from "./GitHubUser";
import GitHubCommitCount from "./GitHubCommitCount";

class GitHubForks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: new GitHubApi.GitHubApiResponse()
        };
    }

    componentDidMount() {
        GitHubApi.get("https://api.github.com/repos/xp-dojo-classes/tdd-bank-account-java/forks")
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
                    {json.map(item => (
                        <div key={item.owner.login}>
                            <img src={item.owner.avatar_url} alt="" width="40" height="40"/>
                            <GitHubUser url={item.owner.url}/>
                            <span> ({item.full_name})</span>
                            <GitHubCommitCount url={item.commits_url}/>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default GitHubForks;