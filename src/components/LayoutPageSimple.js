import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { sidebarWidth } from "./Sidebar";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "calc(100VW - " + sidebarWidth + "px)",
        height: "calc(100VH - 64px)",
        marginTop: 64,
        [theme.breakpoints.down("md")]: {
            width: "100VW",
            height: "calc(100VH - 56px)",
            marginTop: 56
        }
    }
}));

const LayoutPageSimple = props => {

    const classes = useStyles();

    return (
        <Box display="flex" direction="row" justifyContent="center" alignItems="center" className={classes.container}>
            {props.pageLoading ? <CircularProgress disableShrink /> : props.pageContent}
        </Box>
    );
}

export default LayoutPageSimple;