import React from "react";

import { Grid, Box, Typography, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    appBarOffset: theme.mixins.toolbar
}));

export const MarginTop = props => <div style={{ marginTop: props.margin }} />;
export const PageTitle = props => <Typography {...props} variant={"h4"}>{props.children}</Typography>;
export const PageHeader = props => (
    <>
        <MarginTop margin={useStyles().appBarOffset} />
        <MarginTop margin={40} />
        {props.children}
    </>
);
export const PageContent = props => (
    <>
        <MarginTop margin={40} />
        {props.children}
        <MarginTop margin={40} />
    </>
);

const LayoutPage = props => {

    const classes = useStyles();

    const loadingContent = (
        <Box display="flex" direction="row" justifyContent="center" alignItems="center" className={classes.appBarOffset}>
            <CircularProgress disableShrink />
        </Box>
    );

    return (
        <Grid container direction="row">
            <Grid item xs />
            <Grid item xs={11} lg={10} xl={8} container direction="column">
                <div className={classes.appBarOffset} />
                {props.pageLoading ? loadingContent : props.children}
            </Grid>
            <Grid item xs />
        </Grid >
    );
}

export default LayoutPage;