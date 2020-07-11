import React from 'react';
import './App.css';
import GitHubForks from './GitHubForks'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="Header">
                    <img src="logo192.png" alt="xp-dojo" height="50" width="50"/>
                </div>
                <columns>
                    <GitHubForks/>
                </columns>
            </div>
        );
    }
}

export default App;
