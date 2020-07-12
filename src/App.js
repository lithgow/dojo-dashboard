import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import './App.css';
import GitHubForks from './GitHubForks'

class App extends React.Component {
    render() {
        return (
            <Box className="App">
                <AppBar position="static">
                    <img src="navbar_brand2x.png" alt="xp-dojo" height="50" width="50"/>
                </AppBar>
                <GitHubForks/>
            </Box>
        );
    }
}

export default App;
