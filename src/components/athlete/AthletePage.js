import React from "react";

import LayoutPage, { PageHeader, PageTitle, PageContent } from "../LayoutPage";
import { API_URL, useFetch, defaultGetOptions, loading, STRAVA_ACTIVITY_URL, STRAVA_ATHLETE_URL } from "../utils/FetchUtils";
import { useSnackbar } from "notistack";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";

import { AppLink, ExternalLink } from "../Navigation";
import TableComponent from "../TableComponent";
import { Typography, Box, Avatar } from "@material-ui/core";

import StravaIcon from "../../files/strava.jpg";

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
    const pageLoading = loading(athleteData, resultData);

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
    const tableData = resultData.data;
    const pointsSum = tableData.reduce((prev, next) => prev + next.activityResult.points, 0).toFixed(2);
    const pointsSumTrailtour = tableData.reduce((prev, next) => prev + next.activityResult.trailtourPoints, 0).toFixed(2);

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageHeader>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Box display="flex" flexDirection="row" flexWrap="wrap" flexGrow={1}>
                        <Box mr={2}>
                            <PageTitle>{athleteData.data.name}</PageTitle>
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Typography component="div">
                                <Box fontWeight="fontWeightBold" fontFamily="Monospace">
                                    {pointsSum} | {pointsSumTrailtour}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <ExternalLink href={STRAVA_ATHLETE_URL(athleteId)} > <Avatar alt="Strava" variant="square" src={StravaIcon} style={{ width: 80, height: 32 }} /></ExternalLink>
                    </Box>
                </Box>
            </PageHeader>
            <PageContent>
                <TableComponent
                    options={tableOptions}
                    data={tableData}
                    sort={{ key: "activity.date", direction: "desc" }}
                />
            </PageContent>
        </LayoutPage>
    );
}

export default Athletepage;