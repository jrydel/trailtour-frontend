import React from "react";

import useSWR, { useSWRPages, useSWRInfinite } from "swr";
import moment from "moment";

import Page, { PageTitle, PageError, PageBox, PageLoading } from "./layout/Page";
import { Table } from "../utils/TableUtils";
import { defaultGetOptions, fetcher, API_URL } from "../utils/FetchUtils";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { ExternalLink, AppLink, tableClasses } from "../utils/NavUtils";
import { Box } from "../utils/LayoutUtils";

const Dashboard = () => {

    const limit = 50;
    const { data, error, setPage } = useSWRInfinite(
        (offset, previousPageData) => {
            console.log(offset);
            if (previousPageData && previousPageData.length === 0) return null;
            return `${API_URL}/getFeed?database=trailtour_cz&limit=${limit}&offset=${offset * limit}`;
        },
        url => fetcher(url, defaultGetOptions)
    );
    console.log(data);

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

    return (
        <Page>
            <PageBox>
                <div className="flex justify-center sm:justify-start">
                    <PageTitle>Novinky</PageTitle>
                </div>
            </PageBox>
            <PageBox>
                <Box>
                    <Table options={tableOptions} data={[].concat(...data)} />
                    <div className="flex flex-row justify-center py-4">
                        <div onClick={() => setPage(prev => prev + 1)} className={`${tableClasses.className} ${limit === 500 ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>Dalších 50</div>
                    </div>
                </Box>
            </PageBox>
        </Page>
    )
}

export default Dashboard;