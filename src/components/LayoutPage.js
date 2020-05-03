import React from "react";

import { Grid, Box, Typography, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    layout: {
        display: "flex"
    },
    item: {
        marginTop: theme.spacing(5)
    }
}));

export const PageTitle = props => <Typography {...props} variant={"h4"}>{props.children}</Typography>;

const LayoutPage = props => {

    const classes = useStyles();

    return props.pageLoading ? (
        <Grid item xs className={classes.item} >
            <Box display="flex" direction="row" justifyContent="center" alignItems="center">
                <CircularProgress disableShrink />
            </Box>
        </Grid>
    ) : (
            <>
                <Grid item xs className={classes.item} >
                    {props.pageTitle}
                </Grid >
                <Grid item xs className={classes.item}>
                    {props.pageContent}
                </Grid>
                <Grid item xs className={classes.item} />
            </>
        );
}

export default LayoutPage;