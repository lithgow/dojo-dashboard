import React from "react";
import { Base64 } from 'js-base64';
import { credentials } from './credentials.js';

class GitHubForks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            statusOk: false,
            json: []
        };
    }

    componentDidMount() {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + Base64.encode(credentials.username + ":" + credentials.password));

        fetch("https://api.github.com/repos/xp-dojo/tdd-bank-account-java/forks",
            {
                method: 'GET',
                headers: headers,
            })
            .then(response => {
                this.setState({statusOk: response.ok});
                response.json().then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            json: result
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
            })
    }

    render() {
        const { error, isLoaded, statusOk, json } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (!statusOk) {
            return (
                <p>{json.message}</p>
            );
        } else {
            return (
                <ul>
                    {json.map(item => (
                        <div>
                            <img src={item.owner.avatar_url} alt={item.owner.login} width="40" height="40"/>
                            {item.owner.login} {item.full_name}
                        </div>
                    ))}
                </ul>
            );
        }
    }
}

export default GitHubForks;