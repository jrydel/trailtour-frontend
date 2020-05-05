import React from "react";

import { Paper, Tabs, Tab, Avatar, Box, makeStyles } from "@material-ui/core";

import { useSnackbar } from 'notistack';

import LayoutPage, { PageTitle } from "../LayoutPage";
import { StageTable } from "./StageTable";
import { useFetch, API_URL, defaultGetOptions } from "../utils/FetchUtils";
import { formatStageNumber } from "../utils/FormatUtils";
import { ExternalLink } from "../Navigation";

import StravaIcon from "../../files/strava.jpg";
import TrailtourIcon from "../../files/trailtour.jpg";

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(2)
    },
    small: {
        width: theme.spacing(10),
        height: theme.spacing(4)
    },
}));

const StagePage = props => {

    const classes = useStyles();

    const country = props.match.params.country;
    const database = country === "cz" ? "trailtour_cz" : "trailtour_sk";
    const number = props.match.params.number;

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // api data
    const stageData = useFetch(
        API_URL + "/getStage?database=" + database + "&number=" + number,
        defaultGetOptions,
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const resultData = useFetch(
        API_URL + "/getResults?database=" + database + "&number=" + number,
        defaultGetOptions,
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const countData = useFetch(
        API_URL + "/getResultsCount?database=" + database + "&number=" + number,
        defaultGetOptions,
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const tabData = [
        {
            key: "M",
            label: "Muži (" + countData.data.M + ")"
        },
        {
            key: "F",
            label: "Ženy (" + countData.data.F + ")"
        },
        {
            key: "C",
            label: "Kluby (" + countData.data.C + ")",
            disabled: true
        }
    ]

    const [tabValue, setSelectedTabValue] = React.useState(0);
    const handleTabChange = (event, value) => {
        setSelectedTabValue(value);
    };

    const filteredTableData = resultData.data.filter(value => value.athlete.gender === tabData[tabValue].key).map(value => {
        return {
            athleteName: value.athlete.name,
            athleteAbuser: value.athlete.abuser,
            clubName: value.athlete.clubName,
            activityId: value.stravaResult && value.stravaResult.activityId,
            date: value.stravaResult && value.stravaResult.date,
            time: value.stravaResult && value.stravaResult.time,
            position: value.stravaResult && value.stravaResult.position,
            points: value.stravaResult && value.stravaResult.points,
            timeTrailtour: value.trailtourResult.time,
            pointsTrailtour: value.trailtourResult.points
        }
    });

    const pageTitle = (
        <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" flexGrow={1}>
            <Box flexGrow={1}><PageTitle>{formatStageNumber(stageData.data.number) + " - " + stageData.data.name}</PageTitle></Box>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <ExternalLink href={stageData.data.stravaUrl} > <Avatar alt="Strava" variant="square" src={StravaIcon} className={classes.small} /></ExternalLink>
                {/*  <div style={{ marginLeft: 5 }} />
                <ExternalLink><Avatar alt="Mapy.cz" variant="square" src={MapyCZIcon} className={classes.small} /></ExternalLink> */}
                <div style={{ marginLeft: 5 }} />
                <ExternalLink href={stageData.data.url}><Avatar alt="Trailtour" variant="square" src={TrailtourIcon} className={classes.small} /></ExternalLink>
            </Box>
        </Box>
    );

    const pageContent = (
        <>
            <Paper square>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    value={tabValue}
                    onChange={handleTabChange}
                >
                    {tabData.map(val => <Tab {...val} />)}
                </Tabs>
            </Paper>
            <div className={classes.item} />
            <StageTable rows={filteredTableData} />
        </>
    );

    return (
        <LayoutPage
            pageLoading={stageData.loading || resultData.loading}
            pageTitle={pageTitle}
            pageContent={pageContent} />
    );

}

export default StagePage;