import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(5)
    }
}));

const LayoutPage = props => {

    const classes = useStyles();

    return (
        <>
            <Grid item xs className={classes.item}>
                <Typography variant={"h4"}>{props.pageTitle}</Typography>
            </Grid>
            <Grid item xs className={classes.item}>
                {props.pageContent}
            </Grid>
            <Grid item xs className={classes.item} />
        </>
    )
}

export default LayoutPage;