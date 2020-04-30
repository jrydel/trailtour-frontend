import React from "react";

import LayoutPage from "../LayoutPage";
import { Link } from "@material-ui/core";

const SegmentPage = props => {

    const segmentId = props.match.params.id;

    const pageTitle = "Segment " + segmentId;

    const pageComment = (
        <Link href={"http://strava.com/segments/" + segmentId} target="_blank" rel="noreferrer">
            ({segmentId})
        </Link>
    );

    return (
        <LayoutPage pageTitle={"Segment"} pageComment={pageComment}></LayoutPage>
    );

}

export default SegmentPage;