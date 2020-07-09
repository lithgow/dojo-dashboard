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
        const parser = new DOMParser();
        const xml = parser.parseFromString(this.props.xml,"text/xml");
        const counters = xml.evaluate( '/report/counter', xml, null, XPathResult.ANY_TYPE, null );

        let summary = "";
        let result = counters.iterateNext();
        while (result) {
            let missed = result.getAttribute("missed");
            summary += missed + " ";
            result = counters.iterateNext();
        }
        return summary;
    }
}

export default GitHubCoverage;