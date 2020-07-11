import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#282c34',
            paper: '#364252'
        },
    }
});

export default theme;