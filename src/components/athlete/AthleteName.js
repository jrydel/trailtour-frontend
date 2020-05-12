import React from "react";

import { Box, Typography, Tooltip } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { AppLink } from "../Navigation";

export const AthleteNameBox = props => (
    <Box display="flex" flexDirection="row" alignItems="center">
        {props.icon}
        <AppLink to={"/zavodnik/cz/" + props.athlete.id}>
            <Typography noWrap={true} variant="inherit">{props.athlete.name}</Typography>
        </AppLink>
        {props.athlete.abuser &&
            <Tooltip title="Privátní aktivista.">
                <ErrorIcon color="secondary" style={{ marginLeft: 5 }} />
            </Tooltip>
        }
    </Box>
);