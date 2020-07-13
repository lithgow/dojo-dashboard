import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#364252',
            paper: '#364252'
        },
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#364252'
            }
        },
        MuiAvatar: {
            root: {
                height: 25,
                width: 25,
            }
        }
    }
});

export default theme;