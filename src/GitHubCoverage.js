import React from "react";
import AssessmentIcon from '@material-ui/icons/Assessment';
import StyledBadge from "./StyledBadge";

class GitHubCoverage extends React.Component {

    render() {
        let coverage = "-";
        let coverageIconColor = "disabled";
        if (this.props.xml) {
            coverage = this.parseCoverageCounters(this.props.xml);
            coverageIconColor = "action";
        }
        const coverageBadgeColor = coverage > 0 && coverage < 90 ? 'error': 'primary';
        return (
            <StyledBadge badgeContent={`${coverage}%`} color={coverageBadgeColor}>
                <AssessmentIcon color={coverageIconColor}/>
            </StyledBadge>
        );
    }

    parseCoverageCounters() {
        const xml = new DOMParser().parseFromString(this.props.xml,"text/xml");
        const counters = xml.evaluate( `/report/counter[@type='INSTRUCTION']`, xml, null, XPathResult.ANY_TYPE, null );

        let coverage = "-";
        let instructionCoverage = counters.iterateNext();
        if (instructionCoverage) {
            const covered = parseInt(instructionCoverage.getAttribute("covered"));
            const missed = parseInt(instructionCoverage.getAttribute("missed"));
            const total = covered + missed;
            coverage = Math.floor(covered / total * 100);
            // coverage = `${percentage}% (${covered}/${total})`;
        }
        return coverage;
    }
}

export default GitHubCoverage;