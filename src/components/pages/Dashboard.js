import React from "react";

import useSWR from "swr";
import moment from "moment";

import { PageTitle, PageError, PageBox, PageLoading } from "./layout/Page";
import { Table } from "../utils/TableUtils";
import { defaultGetOptions, fetcher, API_URL } from "../utils/FetchUtils";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { ExternalLink, AppLink, tableClasses } from "../utils/NavUtils";
import { Box } from "../utils/LayoutUtils";

const Dashboard = () => {

    const [limit, setLimit] = React.useState(50);
    const { data, error } = useSWR(`${API_URL}/getFeed?database=trailtour_cz&limit=${limit}`, url => fetcher(url, defaultGetOptions));

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
        <>
            <PageBox>
                <div className="flex justify-center sm:justify-start">
                    <PageTitle>Novinky</PageTitle>
                </div>
            </PageBox>
            <PageBox>
                <Box>
                    <div className="flex flex-row items-center justify-center sm:justify-end p-2">
                        <div onClick={() => setLimit(50)} className={`${tableClasses.className} ${limit === 50 ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>50</div>
                        <div onClick={() => setLimit(100)} className={`${tableClasses.className} ${limit === 100 ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>100</div>
                        <div onClick={() => setLimit(500)} className={`${tableClasses.className} ${limit === 500 ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>500</div>

                    </div>
                    <Table options={tableOptions} data={data} />
                </Box>
            </PageBox>
        </>
    )
}

export default Dashboard;