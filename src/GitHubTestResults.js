import React from "react";
import Box from "@material-ui/core/Box";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import StyledBadge from "./StyledBadge";

class GitHubTestResults extends React.Component {
    render() {
        let testCount;
        let passCount;
        let failCount;
        let skipCount;

        let testIconColor = "disabled";
        let passIconColor = "disabled";
        let failIconColor = "disabled";
        let skipIconColor = "disabled";

        let passBadgeColor = "primary";
        let failBadgeColor = "primary";

        if (this.props.json) {
            const testResults = JSON.parse(this.props.json);

            testCount = testResults.tests;
            passCount = testResults.passed;
            failCount = testResults.failed;
            skipCount = testResults.skipped;

            testIconColor = "action";
            passIconColor = "action";
            failIconColor = "action";
            skipIconColor = "action";

            passBadgeColor = testResults.passed > 0 && testResults.failed === 0 ? 'secondary': 'primary';
            failBadgeColor = testResults.failed > 0 ? 'error': 'primary';
        }

        return (
            <Box display="flex" alignItems="center">
                <StyledBadge badgeContent={testCount}>
                    {<AssignmentIcon color={testIconColor}/>}
                </StyledBadge>
                <StyledBadge badgeContent={passCount} color={passBadgeColor}>
                    {<CheckIcon color={passIconColor}/>}
                </StyledBadge>
                <StyledBadge badgeContent={failCount} color={failBadgeColor}>
                    {<ClearIcon color={failIconColor}/>}
                </StyledBadge>
                <StyledBadge badgeContent={skipCount}>
                    {<BlockIcon color={skipIconColor}/>}
                </StyledBadge>
            </Box>
        );
    }
}

export default GitHubTestResults;