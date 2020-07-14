import React from "react";
import AssessmentIcon from '@material-ui/icons/Assessment';
import Tooltip from "@material-ui/core/Tooltip";
import StyledBadge from "./StyledBadge";

class GitHubCoverage extends React.Component {

    render() {
        const coverageResults = this.parseCoverageCounters(this.props.xml);
        const coverage = coverageResults.coverage;
        const coveragePercent = coverage ? `${coverage}%`: '';
        const coverageFraction = coverageResults.coverageFraction;
        const coverageIconColor = coverageResults.coverageIconColor;
        const coverageBadgeColor = coverage > 0 && coverage < 90 ? 'error': 'primary';

        const unbadgedCoverageIcon = (
            <Tooltip title={coverageFraction}>
                <AssessmentIcon color={coverageIconColor}/>
            </Tooltip>
        );
        const badgedCoverageIcon = (
            <StyledBadge badgeContent={`${coverage}%`} color={coverageBadgeColor}>
                {unbadgedCoverageIcon}
            </StyledBadge>
        );
        const coverageIcon = coveragePercent ? badgedCoverageIcon : unbadgedCoverageIcon;

        return (coverageIcon);
    }

    parseCoverageCounters() {
        let coverage;
        let coverageFraction = "";
        let coverageIconColor = "disabled";
        if (this.props.xml) {
            const xml = new DOMParser().parseFromString(this.props.xml, "text/xml");
            const counters = xml.evaluate(`/report/counter[@type='INSTRUCTION']`, xml, null, XPathResult.ANY_TYPE, null);

            let instructionCoverage = counters.iterateNext();
            if (instructionCoverage) {
                const covered = parseInt(instructionCoverage.getAttribute("covered"));
                const missed = parseInt(instructionCoverage.getAttribute("missed"));
                const total = covered + missed;
                coverage = Math.floor(covered / total * 100);
                coverageFraction = `${covered} / ${total}`;
                coverageIconColor = "action";
            }
        }
        return {coverage, coverageFraction, coverageIconColor};
    }
}

export default GitHubCoverage;