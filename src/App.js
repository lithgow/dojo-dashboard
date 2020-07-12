import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core/styles";
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

export const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 0,
        top: 12,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);
