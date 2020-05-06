import React from "react";
import { CircularProgress } from "@material-ui/core";

const LayoutPageSimple = props => {

    return (
        <div style={{ width: "100%", position: "relative" }}>
            {props.pageLoading ? <CircularProgress disableShrink /> : props.pageContent}
        </div >
    )
}

export default LayoutPageSimple;