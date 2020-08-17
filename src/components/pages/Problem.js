import React from "react";

import useSWR from "swr";
import moment from "moment";

import Page, { PageTitle, PageError, PageBox, PageLoading } from "./layout/Page";
import { Table, TablePagination } from "../utils/TableUtils";
import { defaultGetOptions, fetcher, API_URL } from "../utils/FetchUtils";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { ExternalLink, AppLink } from "../utils/NavUtils";
import { Box } from "../utils/LayoutUtils";

const Problem = () => {

    const limit = 50;
    const [page, setPage] = React.useState(0);
    const { data, error } = useSWR(`${API_URL}/getFeed?database=trailtour&limit=${limit}&offset=${page * limit}`, url => fetcher(url, defaultGetOptions));

    const tableOptions = [
        { header: "Nahráno", align: "center", sort: { id: "activity.created", direction: "desc" }, render: row => moment(row.activity.created).startOf("hour").fromNow() },
        { header: "Etapa", align: "left", sort: { id: "stage.number" }, render: row => <AppLink to={`/etapa/${row.stage.number}`}>{formatStageNumber(row.stage.number) + " - " + row.stage.name}</AppLink> },
        { header: "Závodník", align: "left", sort: { id: "athlete.name" }, render: row => <AppLink to={`/zavodnik/${row.athlete.id}`}>{row.athlete.name}</AppLink> },
        { header: "Čas", align: "right", sort: { id: "activity.time" }, render: row => <ExternalLink to={`http://strava.com/activities/${row.activity.id}`}>{formatSeconds(row.activity.time)}</ExternalLink> },
        { header: "Pozice na segmentu", align: "center", sort: { id: "activity.position" }, render: row => row.activity.position }
    ];

    if (error) {
        return <PageError full={true} />
    }
    if (!data) return <PageLoading full={true} />

    const lastPage = Math.round(data.count / limit);
    const lastUpdate = moment(data.lastUpdate).format("HH:mm:ss");

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>Novinky</PageTitle>
                    <span>{`Poslední aktualizace: ${lastUpdate}`}</span>
                </div>
            </PageBox>
            <PageBox>
                <Box>
                    <Table options={tableOptions} data={[].concat(...data.data)} />
                    <TablePagination page={page} lastPage={lastPage} onNextPageClick={() => setPage(prev => prev === lastPage ? prev : prev + 1)} onPreviousPageClick={() => setPage(prev => prev === 0 ? prev : prev - 1)} />
                </Box>
            </PageBox>
        </Page>
    )
}

export default Problem;