import React from "react";

import { Box, Typography } from "@material-ui/core";
import { AppLink } from "../Navigation";

export const AthleteNameBox = props => (
    <Box display="flex" flexDirection="row" alignItems="center">
        {props.icon}
        <AppLink to={"/zavodnik/cz/" + props.athlete.id}>
            <Typography noWrap={true} variant="inherit">{props.athlete.name}</Typography>
        </AppLink>
    </Box>
);