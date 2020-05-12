import React from "react";

import LayoutPage, { PageHeader, PageTitle, PageContent } from "../LayoutPage";
import { API_URL, useFetch, defaultGetOptions, loading, STRAVA_ACTIVITY_URL } from "../utils/FetchUtils";
import { useSnackbar } from "notistack";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";

import { AppLink, ExternalLink } from "../Navigation";
import TableComponent from "../TableComponent";

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
        { id: 'date', label: 'Datum', align: "center", sort: "stravaResult.date", render: (row) => row.stravaResult.date },
        { id: 'stage', label: 'Etapa', align: "left", sort: "stage.number", render: (row) => <AppLink to={"/etapy/" + country + "/" + row.stage.number}>{formatStageNumber(row.stage.number) + " - " + row.stage.name}</AppLink> },
        { id: "position", label: "Pozice", align: "center", sort: "stravaResult.position", render: (row) => row.stravaResult && row.stravaResult.position },
        { id: "positionTrailtour", label: "Pozice TT", align: "center", sort: "trailtourResult.position", render: (row) => row.trailtourResult && row.trailtourResult.position },
        { id: "time", label: "Čas", align: "right", sort: "stravaResult.time", render: (row) => row.stravaResult && <ExternalLink href={STRAVA_ACTIVITY_URL(row.stravaResult.activityId)}>{formatSeconds(row.stravaResult.time)}</ExternalLink> },
        { id: "timeTrailtour", label: "Čas TT", align: "right", sort: "trailtourResult.time", render: (row) => row.trailtourResult && formatSeconds(row.trailtourResult.time) },
        { id: "points", label: "Body", align: "right", sort: "stravaResult.points", render: (row) => row.stravaResult && row.stravaResult.points },
        { id: "pointsTrailtour", label: "Body TT", align: "right", sort: "trailtourResult.points", render: (row) => row.trailtourResult && row.trailtourResult.points }
    ];
    const tableData = resultData.data;

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageHeader>
                <PageTitle>{athleteData.data.name}</PageTitle>
            </PageHeader>
            <PageContent>
                <TableComponent
                    options={tableOptions}
                    data={tableData}
                    sort={{ key: "stravaResult.date", direction: "desc" }}
                />
            </PageContent>
        </LayoutPage>
    );
}

export default Athletepage;