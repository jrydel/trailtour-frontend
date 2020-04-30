import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const LayoutPage = props => {

    return (
        <>
            <Grid item />
            <Grid item style={{ display: "flex" }}>
                <Typography variant={"h4"}>{props.pageTitle}</Typography>
                <Typography style={{ fontSize: 16 }}>{props.pageComment}</Typography>
            </Grid>
            <Grid item>
                <Grid container direction="row" spacing={1}>
                    {props.pageContent}
                </Grid>
            </Grid>
            <Grid item />
        </>
    )
}

export default LayoutPage;