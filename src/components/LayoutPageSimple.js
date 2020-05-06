import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(5)
    },
    appBarOffset: theme.mixins.toolbar
}));

const LayoutPageSimple = props => {

    const classes = useStyles();

    return (
        <div style={{ width: "100%", position: "relative" }}>
            {props.pageLoading ? <CircularProgress disableShrink /> : props.pageContent}
        </div >
    )
}

export default LayoutPageSimple;