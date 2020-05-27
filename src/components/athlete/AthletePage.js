import React from "react";

import LayoutPage, { PageHeader, PageTitle, PageContent, MarginTop } from "../LayoutPage";
import { API_URL, useFetch, defaultGetOptions, loading, STRAVA_ACTIVITY_URL, STRAVA_ATHLETE_URL } from "../utils/FetchUtils";
import { useSnackbar } from "notistack";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";

import { AppLink, ExternalLink } from "../Navigation";
import TableComponent from "../TableComponent";
import { Box, Avatar, Paper, Chip, Tooltip } from "@material-ui/core";

import StravaIcon from "../../files/strava.jpg";
import { TileLayer, Map, Marker, Popup } from "react-leaflet";

import { blueIcon, greenIcon } from '../utils/MapUtils';

const computeAverage = (arr) => arr.reduce((p, c) => p + (c === null ? 0 : c), 0) / arr.length;

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
                    <Box flexGrow={1}>
                        <PageTitle >{athleteData.data.name}</PageTitle>
                    </Box>
                    <ExternalLink href={STRAVA_ATHLETE_URL(athleteId)} > <Avatar alt="Strava" variant="square" src={StravaIcon} style={{ width: 80, height: 32 }} /></ExternalLink>
                </Box>
            </PageHeader>
            <PageContent>
                {athleteData.data.ladder &&
                    <Box display="flex" flexDirection="row" flexWrap="wrap" >
                        <Tooltip title="Aktuální výsledky">
                            <Chip avatar={<Avatar>A</Avatar>} label={`${athleteData.data.ladder.points} (${athleteData.data.ladder.position})`} color="primary" style={{ marginRight: 5 }} />
                        </Tooltip>
                        <Tooltip title="Oficiální TT výsledky">
                            <Chip avatar={<Avatar>O</Avatar>} label={`${athleteData.data.ladder.trailtourPoints} (${athleteData.data.ladder.trailtourPosition})`} color="primary" style={{ marginRight: 5 }} />
                        </Tooltip>
                        <Tooltip title="Počet zaběhnutých etap">
                            <Chip avatar={<Avatar>E</Avatar>} label={`${filteredResults.length} / ${resultData.data.length}`} color="primary" style={{ marginRight: 5 }} />
                        </Tooltip>
                        <Tooltip title="Průměrné body z etap">
                            <Chip avatar={<Avatar>P</Avatar>} label={`${average.toFixed(2)} / ${trailtourAverage.toFixed(2)}`} color="primary" />
                        </Tooltip>
                    </Box>
                }
                <MarginTop margin={16} />
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