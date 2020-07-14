import React from "react";
import AssessmentIcon from '@material-ui/icons/Assessment';
import Tooltip from "@material-ui/core/Tooltip";
import StyledBadge from "./StyledBadge";

class GitHubCoverage extends React.Component {

    render() {
        const instructionCoverage = this.parseCoverageCounters("INSTRUCTION");
        const lineCoverage = this.parseCoverageCounters("LINE");
        const highlightedCoverage = lineCoverage.coverage;
        const tooltip = !highlightedCoverage && highlightedCoverage !== 0 ? "" :
            <div>
                Line: {lineCoverage.coverageFraction} ({lineCoverage.coverage}%)
                <br/>
                Instruction: {instructionCoverage.coverageFraction} ({instructionCoverage.coverage}%)
            </div>;

        const unbadgedCoverageIcon = (
            <Tooltip title={tooltip}>
                <AssessmentIcon color={instructionCoverage.coverageIconColor}/>
            </Tooltip>
        );

        const coverageBadgeColor = highlightedCoverage > 0 && highlightedCoverage < 90 ? 'error': 'primary';
        const badgedCoverageIcon = (
            <StyledBadge badgeContent={`${highlightedCoverage}%`} color={coverageBadgeColor}>
                {unbadgedCoverageIcon}
            </StyledBadge>
        );
        return typeof highlightedCoverage !== 'undefined' ? badgedCoverageIcon : unbadgedCoverageIcon;
    }

    parseCoverageCounters(counterName) {
        let coverage;
        let coverageFraction = "";
        let coverageIconColor = "disabled";
        if (this.props.xml) {
            const xml = new DOMParser().parseFromString(this.props.xml, "text/xml");
            const counters = xml.evaluate(`/report/counter[@type='${counterName}']`, xml, null, XPathResult.ANY_TYPE, null);

            let coverageCounter = counters.iterateNext();
            if (coverageCounter) {
                const covered = parseInt(coverageCounter.getAttribute("covered"));
                const missed = parseInt(coverageCounter.getAttribute("missed"));
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