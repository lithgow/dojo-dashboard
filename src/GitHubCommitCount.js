import React from "react";
import PublishIcon from '@material-ui/icons/Publish';
import StyledBadge from "./StyledBadge";
import * as GitHubApi from './GitHubApi'

class GitHubCommitCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: new GitHubApi.GitHubApiResponse()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getCommits(),
            GitHubApi.refreshInterval
        );
        this.getCommits();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCommits() {
        const firstCommitUrl = this.props.url.replace("{/sha}", "") + "?per_page=1";
        GitHubApi.get(firstCommitUrl)
            .then(response => {
                this.setState({apiResponse: response});
            })
    }

    render() {
        const { statusOk, isLoaded, json, error } = this.state.apiResponse;
        let numberOfCommits;
        let iconColor = "disabled";
        if (error) {
            console.log(`Error getting ${this.props.url} : ${error.message}`);
            numberOfCommits="!";
        } else if (!isLoaded) {
            numberOfCommits="?";
        } else if (!statusOk) {
            console.log(`Error getting ${this.props.url} : ${json.message}`);
            numberOfCommits="!";
        } else {
            const linkHeader = this.state.apiResponse.headers.get('link');
            const matches = linkHeader.match(/(.*"next")(.*page=)([0-9]*)(.*"last")/);
            numberOfCommits = matches[3];
            iconColor = "action";
        }
        return (
            <StyledBadge badgeContent={numberOfCommits}>
                <PublishIcon color={iconColor} />
            </StyledBadge>
        );
    }
}

export default GitHubCommitCount;