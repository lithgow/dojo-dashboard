import React from 'react';
import './App.css';
import GitHubForks from './GitHubForks'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <columns>
                    <GitHubForks/>
                </columns>
            </div>
        );
    }
}

export default App;
