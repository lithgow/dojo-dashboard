import React from "react";
import Box from "@material-ui/core/Box";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import StyledBadge from "./StyledBadge";

class GitHubTestResults extends React.Component {
    render() {
        if (this.props.json) {
            const testResults = JSON.parse(this.props.json);
            const passedBadgeColor = testResults.passed > 0 && testResults.failed === 0 ? 'secondary': 'primary';
            const failedBadgeColor = testResults.failed > 0 ? 'error': 'primary';
            return (
                <Box display="flex" alignItems="center">
                    <StyledBadge badgeContent={testResults.tests}>
                        <AssignmentIcon />
                    </StyledBadge>
                    <StyledBadge badgeContent={testResults.passed}
                                 color={passedBadgeColor}>
                        <CheckIcon />
                    </StyledBadge>
                    <StyledBadge badgeContent={testResults.failed}
                                 color={failedBadgeColor}>
                        <ClearIcon />
                    </StyledBadge>
                    <StyledBadge badgeContent={testResults.skipped}>
                        <BlockIcon />
                    </StyledBadge>
                </Box>
            );
        } else return "";
    }
}

export default GitHubTestResults;