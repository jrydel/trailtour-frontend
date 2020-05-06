import React from "react";

import { Grid, Box, Typography, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(5)
    },
    appBarOffset: theme.mixins.toolbar
}));

export const PageTitle = props => <Typography {...props} variant={"h4"}>{props.children}</Typography>;

const LayoutPage = props => {

    const classes = useStyles();

    return (
        <Grid container direction="row">
            <Grid item xs />
            <Grid item xs={11} lg={10} xl={8} container direction="column">
                <div className={classes.appBarOffset} />
                {props.pageLoading ? (
                    <Box display="flex" direction="row" justifyContent="center" alignItems="center" className={classes.item}>
                        <CircularProgress disableShrink />
                    </Box>
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
                    )}
            </Grid>
            <Grid item xs />
        </Grid >
    );
}

export default LayoutPage;