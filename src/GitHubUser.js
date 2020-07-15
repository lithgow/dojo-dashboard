import React from "react";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as GitHubApi from './GitHubApi'

class GitHubUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: new GitHubApi.GitHubApiResponse()
        };
        this.width = 148;
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
            console.log(`Error getting ${this.props.url} : ${error.message}`);
            return (
                <Box width={this.width}>
                    <Alert severity="error">Error loading user details</Alert>
                </Box>
            );
        } else if (!isLoaded) {
            return (
                <Box width={this.width}>
                    <LinearProgress />
                </Box>
            );
        } else if (!statusOk) {
            console.log(`Error getting ${this.props.url} : ${json.message}`);
            return (
                <Box width={this.width}>
                    <Alert severity="error">Error loading user details</Alert>
                </Box>
            );
        } else {
            const userName = json.name ? json.name : json.login;
            return (
                <Box width={this.width} display="flex" alignItems="center">
                    <Avatar alt={userName} src={json.avatar_url} />&nbsp;{userName}
                </Box>
            );
        }
    }
}

export default GitHubUser;