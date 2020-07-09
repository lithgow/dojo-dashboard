import React from "react";

class GitHubCoverage extends React.Component {

    render() {
        let summary = "";
        if (this.props.xml) {
            summary = this.parseCoverageCounters(this.props.xml);
        }
        return (
            <span> {summary}</span>
        );
    }

    parseCoverageCounters() {
        const xml = new DOMParser().parseFromString(this.props.xml,"text/xml");
        const counters = xml.evaluate( `/report/counter[@type='INSTRUCTION']`, xml, null, XPathResult.ANY_TYPE, null );

        let summary = "";
        let instructionCoverage = counters.iterateNext();
        if (instructionCoverage) {
            const covered = parseInt(instructionCoverage.getAttribute("covered"));
            const missed = parseInt(instructionCoverage.getAttribute("missed"));
            const total = covered + missed;
            const percentage = Math.floor(covered / total * 100);
            summary = `${percentage}% (${covered}/${total})`;
        }
        return summary;
    }
}

export default GitHubCoverage;