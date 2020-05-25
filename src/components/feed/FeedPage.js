import React from "react";

import { useSnackbar } from 'notistack';

import { useFetch, API_URL, defaultGetOptions, loading } from "../utils/FetchUtils";
import LayoutPage, { PageTitle, MarginTop, PageContent, PageHeader } from "../LayoutPage";
import { AthleteNameBox } from "../athlete/AthleteName";
import TableComponent from "../TableComponent";
import { format } from "date-fns";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { Box, Avatar, Paper, Tabs, Tab } from "@material-ui/core";
import { ExternalLink, AppLink } from "../Navigation";

import { cs } from "date-fns/locale";

import FlagCZ from "../../files/flagcz.jpg";
import FlagSK from "../../files/flagsk.jpg";

const FeedPage = props => {

    const apiDataCZ = useFetch(
        API_URL + "/getFeed?database=trailtour_cz&limit=50",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const pageLoading = loading(apiDataCZ);

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

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, value) => {
        setTabValue(value);
    };
    const tabData = [
        {
            key: "cz",
            label: "CZ",
            disabled: false
        },
        {
            key: "sk",
            label: "SK",
            disabled: true
        }
    ]

    const tableOptions = [
        { id: 'created', label: 'Datum', align: "center", sort: "activity.created", render: (row) => format(Date.parse(row.activity.created), "PP - HH:mm:ss", { locale: cs }) },
        { id: 'stageName', label: 'Etapa', align: "left", sort: "stage.number", render: (row) => nameRow(row.stage.number, row.stage.name, row.country) },
        { id: 'athleteName', label: 'Závodník', align: "left", sort: "athlete.name", render: (row) => <AthleteNameBox athlete={row.athlete} /> },
        { id: 'time', label: 'Čas', align: "right", sort: "activity.time", render: (row) => <ExternalLink href={"http://strava.com/activities/" + row.activity.id}>{formatSeconds(row.activity.time)}</ExternalLink> },
        { id: 'position', label: 'Pozice na segmentu', align: "center", sort: "activity.position", render: (row) => row.activity.position }
    ];
    const tableData = apiDataCZ.data.map(val => { return { ...val, country: "cz" } });

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageHeader>
                <PageTitle>Novinky ze Stravy</PageTitle>
            </PageHeader>
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
                    sort={{ key: "activity.created", direction: "desc" }}
                />
            </PageContent>
        </LayoutPage>
    );
}

export default FeedPage;