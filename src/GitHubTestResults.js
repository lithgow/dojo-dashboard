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
            return (
                <Box display="flex" alignItems="center">
                    <StyledBadge badgeContent={testResults.tests} color="primary">
                        <AssignmentIcon />
                    </StyledBadge>
                    <StyledBadge badgeContent={testResults.passed} color="primary">
                        <CheckIcon />
                    </StyledBadge>
                    <StyledBadge badgeContent={testResults.failed} color="primary">
                        <ClearIcon />
                    </StyledBadge>
                    <StyledBadge badgeContent={testResults.skipped} color="primary">
                        <BlockIcon />
                    </StyledBadge>
                </Box>
            );
        } else return "";
    }
}

export default GitHubTestResults;