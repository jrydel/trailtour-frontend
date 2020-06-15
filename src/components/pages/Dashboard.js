import React from "react";
import { PageTitle, PageContent, PageLoader, PageMenu } from "./layout/Page";
import { Table } from "../utils/TableUtils";
import useSWR from "swr";
import { defaultGetOptions, fetcher } from "../utils/FetchUtils";
import { cs } from "date-fns/locale";
import { format } from "date-fns";
import { formatStageNumber, formatSeconds } from "../utils/FormatUtils";
import { ExternalLink, AppLink, pageClasses } from "../utils/NavUtils";
import { Box } from "../utils/LayoutUtils";

const Dashboard = props => {

    const [limit, setLimit] = React.useState(50);
    const { data, error } = useSWR(`https://api.orank.cz/trailtour/getFeed?database=trailtour_cz&limit=${limit}`, url => fetcher(url, defaultGetOptions));

    const tableOptions = [
        { header: 'Datum', align: "center", sort: { id: "activity.created", direction: "desc" }, render: row => format(Date.parse(row.activity.created), "PP - HH:mm:ss", { locale: cs }) },
        { header: 'Etapa', align: "left", sort: { id: "stage.number" }, render: row => <AppLink to={`/etapa/${row.stage.number}`}>{formatStageNumber(row.stage.number) + " - " + row.stage.name}</AppLink> },
        { header: 'Závodník', align: "left", sort: { id: "athlete.name" }, render: row => <AppLink to={`/zavodnik/${row.athlete.id}`}>{row.athlete.name}</AppLink> },
        { header: 'Čas', align: "right", sort: { id: "activity.time" }, render: row => <ExternalLink to={`http://strava.com/activities/${row.activity.id}`}>{formatSeconds(row.activity.time)}</ExternalLink> },
        { header: 'Pozice na segmentu', align: "center", sort: { id: "activity.position" }, render: row => row.activity.position }
    ];

    if (error) {
        console.log(error);
        return <div>error</div>
    }
    if (!data) return <PageLoader />

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <PageTitle>Novinky</PageTitle>
                <PageMenu>
                    <div onClick={() => setLimit(50)} className={`${pageClasses.className} ${limit === 50 ? pageClasses.activeClassName : pageClasses.inactiveClassName}`}>50</div>
                    <div onClick={() => setLimit(100)} className={`${pageClasses.className} ${limit === 100 ? pageClasses.activeClassName : pageClasses.inactiveClassName}`}>100</div>
                    <div onClick={() => setLimit(500)} className={`${pageClasses.className} ${limit === 500 ? pageClasses.activeClassName : pageClasses.inactiveClassName}`}>500</div>
                </PageMenu>
            </div>
            <PageContent>
                <Box>
                    <Table options={tableOptions} data={data} />
                </Box>
            </PageContent>
        </>
    )
}

export default Dashboard;