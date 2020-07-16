import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#364252',
            paper: '#364252'
        },
        secondary: {
            main: '#26be26',
            contrastText: '#fff'
        }
    },
    typography: {
        fontSize: 13,
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
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: defaultTheme.palette.common.white,
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: defaultTheme.shadows[1],
                fontSize: 11,
            }
        }
    },
    props: {
        MuiLink: {
            color: 'inherit',
            underline: 'none',
            target: '_blank',
            rel: 'noopener'
        }
    }
});

export default theme;