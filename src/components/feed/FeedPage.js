import React from "react";

import { useSnackbar } from 'notistack';

import { useFetch, API_URL, defaultGetOptions, loading } from "../utils/FetchUtils";
import LayoutPage, { PageTitle } from "../LayoutPage";
import { AthleteNameBox } from "../athlete/AthleteName";
import TableComponent from "../TableComponent";
import { format } from "date-fns";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { Box, Avatar } from "@material-ui/core";
import { ExternalLink, AppLink } from "../Navigation";

import { cs } from "date-fns/locale";

import FlagCZ from "../../files/flagcz.jpg";
import FlagSK from "../../files/flagsk.jpg";

const FeedPage = props => {

    const apiDataCZ = useFetch(
        API_URL + "/getFeed?database=trailtour_cz&limit=25",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const apiDataSK = useFetch(
        API_URL + "/getFeed?database=trailtour_sk&limit=25",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const pageLoading = loading(apiDataCZ, apiDataSK);

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    const nameRow = (number, name, country) => (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar alt="Country" variant="rounded" src={country === "cz" ? FlagCZ : FlagSK} style={{ width: 30, height: 25 }} />
            <div style={{ marginLeft: 10 }} />
            <AppLink to={"/etapy/" + country + "/" + number}>{formatStageNumber(number) + " - " + name}</AppLink>
        </Box>
    );

    const tableOptions = [
        { id: 'created', label: 'Datum', align: "center", sort: "created", render: (row) => format(Date.parse(row.created), "PP - HH:mm:ss", { locale: cs }) },
        { id: 'stageName', label: 'Etapa', align: "left", sort: "stage.number", render: (row) => nameRow(row.stage.number, row.stage.name, row.country) },
        { id: 'athleteName', label: 'Závodník', align: "left", sort: "athlete.name", render: (row) => <AthleteNameBox name={row.athlete.name} abuser={row.athlete.abuser} /> },
        { id: 'time', type: "time", label: 'Čas', align: "right", sort: "time", render: (row) => <ExternalLink href={"http://strava.com/activities/" + row.activityId}>{formatSeconds(row.time)}</ExternalLink> },
        { id: 'position', type: "number", label: 'Pořadí na segmentu', align: "center", sort: "position", render: (row) => row.position }
    ];
    const tableData = [
        ...apiDataCZ.data.map(val => { return { ...val, country: "cz" } }),
        ...apiDataSK.data.map(val => { return { ...val, country: "sk" } })
    ];

    return (
        <LayoutPage
            pageLoading={pageLoading}
            pageTitle={<PageTitle>Novinky</PageTitle>}
            pageContent={<TableComponent options={tableOptions} data={tableData} sort={{ key: "created", direction: "desc" }} />}>
        </LayoutPage>
    );
}

export default FeedPage;