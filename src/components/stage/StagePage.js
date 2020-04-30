import React from "react";

import { Link } from "@material-ui/core";
import LayoutPage from "../LayoutPage";

const StagePage = props => {

    const segmentId = props.match.params.id;

    const pageComment = (
        <Link href={"http://strava.com/segments/" + segmentId} target="_blank" rel="noreferrer">
            ({segmentId})
        </Link>
    );

    return (
        <LayoutPage pageTitle={"Etapa"} pageComment={pageComment}></LayoutPage>
    );

}

export default StagePage;