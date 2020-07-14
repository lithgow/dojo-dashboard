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

        const unbadgedTestIcon = <AssignmentIcon color={testIconColor}/>;
        const badgedTestIcon = (
            <StyledBadge badgeContent={testCount}>
                {unbadgedTestIcon}
            </StyledBadge>
        );

        const unbadgedPassIcon = <CheckIcon color={passIconColor}/>;
        const badgedPassIcon = (
            <StyledBadge badgeContent={passCount} color={passBadgeColor}>
                {unbadgedPassIcon}
            </StyledBadge>
        );

        const unbadgedFailIcon = <ClearIcon color={failIconColor}/>;
        const badgedFailIcon = (
            <StyledBadge badgeContent={failCount} color={failBadgeColor}>
                {unbadgedFailIcon}
            </StyledBadge>
        );

        const unbadgedSkipIcon = <BlockIcon color={skipIconColor}/>;
        const badgedSkipIcon = (
            <StyledBadge badgeContent={skipCount}>
                {unbadgedSkipIcon}
            </StyledBadge>
        );

        return (
            <Box display="flex" alignItems="center">
                {badgedTestIcon}
                {badgedPassIcon}
                {badgedFailIcon}
                {badgedSkipIcon}
            </Box>
        );

    }
}

export default GitHubTestResults;