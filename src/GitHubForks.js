import React from "react";
import {Base64} from 'js-base64';

class GitHubForks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            statusOk: false
        };
    }

    componentDidMount() {
        let headers = new Headers();
        let username = '';
        let password = '';
        headers.set('Authorization', 'Basic ' + Base64.encode(username + ":" + password));

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
                            items: result
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
        const {error, isLoaded, items, statusOk} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (!statusOk) {
            return (
                <p>{items.message}</p>
            );
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <p>{item.owner.login} {item.full_name}</p>
                    ))}
                </ul>
            );
        }
    }
}

export default GitHubForks;