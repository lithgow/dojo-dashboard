import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
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
        const userName = json.name ? json.name : json.login;
        if (error) {
            console.log(`Error getting ${this.props.url} : ${error.message}`);
            return <Box>!!!</Box>;
        } else if (!isLoaded) {
            return <Box>...</Box>;
        } else if (!statusOk) {
            console.log(`Error getting ${this.props.url} : ${json.message}`);
            return <Box>!!!</Box>;
        } else {
            return (
                <Box width={148} display="flex" alignItems="center">
                    <Avatar alt={userName} src={json.avatar_url} />&nbsp;{userName}
                </Box>
            );
        }
    }
}

export default GitHubUser;