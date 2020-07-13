import React from "react";
import AssessmentIcon from '@material-ui/icons/Assessment';
import StyledBadge from "./StyledBadge";

class GitHubCoverage extends React.Component {

    render() {
        let coverage = "-";
        if (this.props.xml) {
            coverage = this.parseCoverageCounters(this.props.xml);
        }
        return (
            <StyledBadge badgeContent={coverage}>
                <AssessmentIcon />
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
            const percentage = Math.floor(covered / total * 100);
            // coverage = `${percentage}% (${covered}/${total})`;
            coverage = `${percentage}%`;
        }
        return coverage;
    }
}

export default GitHubCoverage;