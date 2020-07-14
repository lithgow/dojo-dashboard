import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubForks from './GitHubForks'
import {appTitle} from "./settings";

class App extends React.Component {
    render() {
        return (
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <img src="navbar_brand2x.png" alt="xp-dojo" height="50" width="50"/>
                        <Typography variant="h5">
                            &nbsp;{appTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <GitHubForks/>
            </Box>
        );
    }
}

export default App;
