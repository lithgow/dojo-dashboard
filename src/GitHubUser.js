import React from "react";
import * as GitHubApi from './GitHubApi'

class GitHubUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: new GitHubApi.GitHubApiResponse()
        };
    }

    componentDidMount() {
        GitHubApi.get(this.props.url)
            .then(response => {
                this.setState({apiResponse: response});
            })
    }

    render() {
        const { statusOk, isLoaded, json, error } = this.state.apiResponse;
        if (error) {
            console.log("Error getting " + this.props.url + " : " + error.message);
            return <div>!!!</div>;
        } else if (!isLoaded) {
            return <div>...</div>;
        } else if (!statusOk) {
            console.log("Error getting " + this.props.url + " : " + json.message);
            return <div>!!!</div>;
        } else {
            return (
                <span>{json.name ? json.name : json.login}</span>
            );
        }
    }
}

export default GitHubUser;