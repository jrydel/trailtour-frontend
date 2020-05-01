import React from "react";

import { Link } from "@material-ui/core";
import LayoutPage from "../LayoutPage";
import { StageTable } from "./StageTable";

import { useSnackbar } from 'notistack';

import { useFetch } from "../FetchApi";
import { API_URL } from "../../AppContext";

const StagePage = props => {

    const segmentId = props.match.params.id;

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // api data
    const [apiData, trigger] = useFetch(
        API_URL + "/getResults?stageId=" + segmentId,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const filteredTableData = [];
    apiData.data.map(value => {
        filteredTableData.push({
            athleteId: value.athlete.id,
            athleteName: value.athlete.name,
            athleteGender: value.athlete.gender,
            activityId: value.activityId,
            date: value.date,
            time: value.time,
            position: value.position,
            pointsStrava: value.pointsStrava
        })
    });

    const pageComment = (
        <Link href={"http://strava.com/segments/" + segmentId} target="_blank" rel="noreferrer">
            ({segmentId})
        </Link>
    );

    const pageContent = (
        <StageTable rows={filteredTableData} />
    );

    return (
        <LayoutPage pageTitle={"Etapa"} pageComment={pageComment} pageContent={pageContent}></LayoutPage>
    );

}

export default StagePage;