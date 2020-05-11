import React from "react";

import { Paper, Tabs, Tab, Avatar, Box, makeStyles } from "@material-ui/core";

import { useSnackbar } from 'notistack';

import LayoutPage, { PageTitle, MarginTop, PageContent } from "../LayoutPage";
import { useFetch, API_URL, defaultGetOptions, loading, STRAVA_ACTIVITY_URL } from "../utils/FetchUtils";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { ExternalLink } from "../Navigation";

import StravaIcon from "../../files/strava.jpg";
import MapyCZIcon from "../../files/mapycz.png";
import TrailtourIcon from "../../files/trailtour.jpg";
import { AthleteNameBox } from "../athlete/AthleteName";
import TableComponent from "../TableComponent";

const useStyles = makeStyles((theme) => ({
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
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const resultData = useFetch(
        API_URL + "/getResults?database=" + database + "&number=" + number,
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const countData = useFetch(
        API_URL + "/getResultsCount?database=" + database + "&number=" + number,
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const pageLoading = loading(stageData, resultData, countData);

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

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, value) => {
        setTabValue(value);
    };

    const tableOptions = [
        { id: "position", label: "Pozice", align: "center", sort: "stravaResult.position", render: (row) => row.stravaResult.position },
        { id: "athleteName", label: "Jméno", align: "left", sort: "athlete.name", render: (row) => <AthleteNameBox name={row.athlete.name} abuser={row.athlete.abuser} /> },
        { id: "clubName", label: "Klub", align: "left", sort: "athlete.clubName", render: (row) => row.athlete.clubName },
        { id: "date", label: "Datum", align: "left", sort: "stravaResult.date", render: (row) => row.stravaResult && row.stravaResult.date },
        { id: "time", label: "Čas", align: "right", sort: "stravaResult.time", render: (row) => row.stravaResult && <ExternalLink href={STRAVA_ACTIVITY_URL(row.stravaResult.activityId)}>{formatSeconds(row.stravaResult.time)}</ExternalLink> },
        { id: "timeTrailtour", label: "Čas TT", align: "right", sort: "trailtourResult.time", render: (row) => row.trailtourResult && formatSeconds(row.trailtourResult.time) },
        { id: "points", label: "Body", align: "right", sort: "stravaResult.points", render: (row) => row.stravaResult && row.stravaResult.points },
        { id: "pointsTrailtour", label: "Body TT", align: "right", sort: "trailtourResult.points", render: (row) => row.trailtourResult && row.trailtourResult.points }
    ];
    const tableData = resultData.data.filter(value => value.athlete.gender === tabData[tabValue].key);

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageTitle>
                <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap" flexGrow={1}>
                    <Box flexGrow={1}><PageTitle>{formatStageNumber(stageData.data.number) + " - " + stageData.data.name}</PageTitle></Box>
                    <Box display="flex" flexDirection="row" flexWrap="wrap">
                        <ExternalLink href={stageData.data.stravaUrl} > <Avatar alt="Strava" variant="square" src={StravaIcon} className={classes.small} /></ExternalLink>
                        <div style={{ marginLeft: 5 }} />
                        <ExternalLink href={stageData.data.mapyczUrl}><Avatar alt="Mapy.cz" variant="square" src={MapyCZIcon} className={classes.small} /></ExternalLink>
                        <div style={{ marginLeft: 5 }} />
                        <ExternalLink href={stageData.data.url}><Avatar alt="Trailtour" variant="square" src={TrailtourIcon} className={classes.small} /></ExternalLink>
                    </Box>
                </Box>
            </PageTitle>
            <PageContent>
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
                <MarginTop margin={16} />
                <TableComponent
                    options={tableOptions}
                    data={tableData}
                    sort={{ key: "stravaResult.points", direction: "desc" }}
                />
            </PageContent>
        </LayoutPage>
    );

}

export default StagePage;