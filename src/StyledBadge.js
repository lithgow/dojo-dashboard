import React from 'react';
import {withStyles} from "@material-ui/styles";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";

const SmallerBadge = withStyles((theme) => ({
    badge: {
        top: 6,
        padding: '0 2px',
    },
}))(Badge);

export default function StyledBadge(props) {
    return (
        <Box width={35}>
            <SmallerBadge color="primary" badgeContent={props.badgeContent} showZero={true}>
                {props.children}
            </SmallerBadge>
        </Box>
    );
}
