import React from "react";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    layout: {
        display: "flex"
    },
    item: {
        marginTop: theme.spacing(5)
    }
}));

const LayoutPage = props => {

    const classes = useStyles();

    return (
        <>
            <Grid item xs className={classes.item}>
                <div className={classes.layout}>
                    <Typography variant={"h4"}>{props.pageTitle}</Typography>
                    <Typography variant={"h6"}>{props.pageComment}</Typography>
                </div>
            </Grid>
            <Grid item xs className={classes.item}>
                {props.pageContent}
            </Grid>
            <Grid item xs className={classes.item} />
        </>
    )
}

export default LayoutPage;