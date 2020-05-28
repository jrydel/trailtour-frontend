import React from "react";

import LayoutPage, { PageHeader, PageTitle, PageContent, MarginTop } from "../LayoutPage";
import { API_URL, useFetch, defaultGetOptions, loading, STRAVA_ACTIVITY_URL, STRAVA_ATHLETE_URL } from "../utils/FetchUtils";
import { useSnackbar } from "notistack";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";

import { AppLink, ExternalLink } from "../Navigation";
import TableComponent from "../TableComponent";
import { Box, Avatar, Paper, Tooltip, Typography } from "@material-ui/core";

import StravaIcon from "../../files/strava.jpg";
import { TileLayer, Map, Marker, Popup } from "react-leaflet";

import { blueIcon, greenIcon } from '../utils/MapUtils';

const computeAverage = (arr) => arr.reduce((p, c) => p + (c === null ? 0 : c), 0) / arr.length;

const InfoBox = props => (
    <Tooltip title={props.tooltip}>
        <Box display="flex" flexDirection="row" alignItems="center" style={{ padding: 2, marginRight: 5 }} >
            <Avatar variant="square" style={{ width: 20, height: 20, backgroundColor: "#1565c0", fontSize: "0.75rem" }}>{props.title}</Avatar>
            <Typography style={{ marginLeft: 5, fontSize: "0.75rem", fontWeight: "bold" }}>{props.content}</Typography>
        </Box>
    </Tooltip>
);

const Athletepage = props => {

    const athleteId = props.match.params.id;
    const country = props.match.params.country;
    const database = country === "cz" ? "trailtour_cz" : "trailtour_sk";

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // api data
    const athleteData = useFetch(
        API_URL + "/getAthlete?database=" + database + "&id=" + athleteId,
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const resultData = useFetch(
        API_URL + "/getAthleteResults?database=" + database + "&athleteId=" + athleteId,
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const filteredResults = resultData.data.filter(item => item.activityResult);
    const average = computeAverage(filteredResults.map(item => item.activityResult.points));
    const trailtourAverage = computeAverage(filteredResults.map(item => item.activityResult.trailtourPoints).filter(x => x));

    const pageLoading = loading(athleteData) || resultData.loading;

    const tableOptions = [
        { id: 'date', label: 'Datum', align: "center", sort: "activity.date", render: (row) => row.activity.date },
        { id: 'stage', label: 'Etapa', align: "left", sort: "stage.number", render: (row) => <AppLink to={"/etapy/" + country + "/" + row.stage.number}>{formatStageNumber(row.stage.number) + " - " + row.stage.name}</AppLink> },
        { id: "position", label: "Pozice", align: "center", sort: "activityResult.position", render: (row) => row.activityResult.position },
        { id: "positionTrailtour", label: "Pozice TT", align: "center", sort: "activityResult.trailtourPosition", render: (row) => row.activityResult.trailtourPosition },
        { id: "time", label: "Čas", align: "right", sort: "activity.time", render: (row) => <ExternalLink href={STRAVA_ACTIVITY_URL(row.activity.id)}>{formatSeconds(row.activity.time)}</ExternalLink> },
        { id: "timeTrailtour", label: "Čas TT", align: "right", sort: "activityResult.trailtourTime", render: (row) => row.activityResult.trailtourTime && formatSeconds(row.activityResult.trailtourTime) },
        { id: "points", label: "Body", align: "right", sort: "activityResult.points", render: (row) => row.activityResult.points },
        { id: "pointsTrailtour", label: "Body TT", align: "right", sort: "activityResult.trailtourPoints", render: (row) => row.activityResult.trailtourPoints }
    ];
    const tableData = resultData.data.filter(item => item.activity || item.activityResult);

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageHeader>
                <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
                    <PageTitle style={{ marginRight: 20 }} >{athleteData.data.name}</PageTitle>
                    <Box flexGrow={1}>
                        {athleteData.data.ladder &&
                            <Box display="flex" flexDirection="row" flexWrap="wrap">
                                <Box display="flex" flexDirection="row" flexWrap="wrap" component={Paper} square>
                                    <Box display="flex" flexDirection="column">
                                        <InfoBox tooltip="Aktuální výsledky" title="A" content={`${athleteData.data.ladder.points} (${athleteData.data.ladder.position})`} />
                                        <InfoBox tooltip="Oficiální TT výsledky" title="O" content={`${athleteData.data.ladder.trailtourPoints} (${athleteData.data.ladder.trailtourPosition})`} />
                                    </Box>
                                    <Box display="flex" flexDirection="column">
                                        <InfoBox tooltip="Počet zaběhnutých etap" title="E" content={`${filteredResults.length} / ${resultData.data.length}`} />
                                        <InfoBox tooltip="Průměrné body z etap" title="P" content={`${average.toFixed(2)} / ${trailtourAverage.toFixed(2)}`} />
                                    </Box>
                                </Box>
                            </Box>
                        }
                    </Box>
                    <ExternalLink href={STRAVA_ATHLETE_URL(athleteId)} > <Avatar alt="Strava" variant="square" src={StravaIcon} style={{ width: 80, height: 32 }} /></ExternalLink>
                </Box>
            </PageHeader>
            <PageContent>
                <Box component={Paper} square>
                    <Map
                        style={{ width: "100%", height: "400px" }}
                        center={[49.8037633, 15.4749126]}
                        zoom={7}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {resultData.data.map((item, key) =>
                            <Marker key={key} position={[item.stage.coordinates.latitude, item.stage.coordinates.longitude]} icon={item.activity && item.activityResult ? greenIcon : blueIcon}>
                                <Popup>
                                    <Box display="flex" flexDirection="column" >
                                        <AppLink to={"/etapy/cz/" + item.stage.number} >{formatStageNumber(item.stage.number) + " - " + item.stage.name}</AppLink>
                                    </Box>
                                </Popup>
                            </Marker>
                        )}
                    </Map>
                </Box>
                <MarginTop margin={16} />
                <TableComponent
                    options={tableOptions}
                    data={tableData}
                    sort={{ key: "activity.date", direction: "desc" }}
                />
            </PageContent >
        </LayoutPage >
    );
}

export default Athletepage;