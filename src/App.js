import React from 'react';
import Box from "@material-ui/core/Box";
import './App.css';
import GitHubForks from './GitHubForks'

class App extends React.Component {
    render() {
        return (
            <Box className="App">
                <Box className="Header">
                    <img src="navbar_brand2x.png" alt="xp-dojo" height="50" width="50"/>
                </Box>
                <GitHubForks/>
            </Box>
        );
    }
}

export default App;
