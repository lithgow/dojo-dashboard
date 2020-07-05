import React from 'react';
import './App.css';
import GitHubForks from './GitHubForks'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <GitHubForks/>
                </header>
            </div>
        );
    }
}

export default App;
