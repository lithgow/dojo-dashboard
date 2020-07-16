import React from 'react';
import {withStyles} from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";

const ErrorTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText
    },
}))(Tooltip);

export default function OnErrorTooltip(props) {
    let value = props.children;
    if (props.title) {
        value =
            <ErrorTooltip title={props.title}>
                {props.children}
            </ErrorTooltip>
    }
    return value;
}
