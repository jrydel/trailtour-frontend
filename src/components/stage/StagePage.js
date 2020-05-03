import React from "react";

import { Paper, Tabs, Tab, Avatar, Box, makeStyles } from "@material-ui/core";

import { useSnackbar } from 'notistack';

import LayoutPage, { PageTitle } from "../LayoutPage";
import { StageTable } from "./StageTable";
import { useFetch, API_URL } from "../utils/FetchUtils";
import { formatStageNumber } from "../utils/FormatUtils";
import { ExternalLink, STRAVA_SEGMENT_URL } from "../Navigation";
import StravaIcon from "../../files/strava.jpg";
import TrailtourIcon from "../../files/trailtour.jpg";
import MapyCZIcon from "../../files/mapycz.png";

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

    const segmentId = props.match.params.id;

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // api data
    const stageData = useFetch(
        API_URL + "/getStage?id=" + segmentId,
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const resultData = useFetch(
        API_URL + "/getResults?stageId=" + segmentId,
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const [tabValue, setSelectedTabValue] = React.useState(0);
    const handleTabChange = (event, value) => {
        setSelectedTabValue(value);
    };

    const filteredTableData = resultData.data.filter(value => {
        if (tabValue === 0) {
            return value.athlete.gender === "M";
        } else {
            return value.athlete.gender === "F";
        }
    });

    const pageTitle = (
        <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" flexGrow={1}>
            <Box flexGrow={1}><PageTitle>{formatStageNumber(stageData.data.number) + " - " + stageData.data.name}</PageTitle></Box>
            <ExternalLink to={STRAVA_SEGMENT_URL + "/" + stageData.data.id} ><Avatar alt="Strava" variant="square" src={StravaIcon} className={classes.small} /></ExternalLink>
            <div style={{ marginLeft: 10 }} />
            <ExternalLink><Avatar alt="Mapy.cz" variant="square" src={MapyCZIcon} className={classes.small} /></ExternalLink>
            <div style={{ marginLeft: 10 }} />
            <ExternalLink><Avatar alt="Trailtour" variant="square" src={TrailtourIcon} className={classes.small} /></ExternalLink>
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
                    <Tab label="Muži" />
                    <Tab label="Ženy" />
                </Tabs>
            </Paper>
            <div className={classes.item} />
            <StageTable rows={filteredTableData} />
        </>
    );

    return (
        <LayoutPage
            pageTitle={stageData.loading ? "" : pageTitle}
            pageContent={pageContent} />
    );

}

export default StagePage;