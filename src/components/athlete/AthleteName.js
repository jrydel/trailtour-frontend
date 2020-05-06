import React from "react";

import { Box, Typography, Tooltip } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

export const AthleteNameBox = props => (
    <Box display="flex" flexDirection="row" alignItems="center">
        <Typography noWrap={true} variant="inherit">{props.name}</Typography>
        {props.abuser &&
            <Tooltip title="Privátní aktivista.">
                <ErrorIcon color="secondary" style={{ marginLeft: 5 }} />
            </Tooltip>
        }
    </Box>
);