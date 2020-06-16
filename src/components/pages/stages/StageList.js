import React from "react";

import moment from "moment";
import { useParams } from "react-router";
import useSWR from "swr";

import { PageBox, PageError, PageLoading } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { ExternalLink, AppLink, tableClasses } from "../../utils/NavUtils";
import { formatSeconds } from "../../utils/FormatUtils";
import { Table } from "../../utils/TableUtils";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";

const StageList = () => {

    const { number } = useParams();

    const [filter, setFilter] = React.useState("M");
    const { data: resultData, error: resultDataError } = useSWR(`${API_URL}/getResults?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));
    const { data: countData, error: countDataError } = useSWR(`${API_URL}/getResultsCount?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (resultDataError || countDataError) {
        console.log(resultDataError, countDataError);
        return <PageError full={false} />
    }

    if (!resultData || !countData) return <PageLoading full={false} />

    const tableOptions = [
        { header: "Pozice", align: "center", sort: { id: "activityResult.position", direction: "asc" }, render: row => row.activityResult.position },
        { header: "Jméno", align: "left", sort: { id: "athlete.name" }, render: row => <AppLink to={`/zavodnik/${row.athlete.id}`}>{row.athlete.name}</AppLink> },
        { header: "Klub", align: "left", sort: { id: "athlete.clubName" }, render: row => row.athlete.clubName },
        { header: "Datum", align: "left", sort: { id: "activity.date" }, render: row => moment(row.activity.date).format("Do MMMM") },
        { header: "Čas", align: "right", sort: { id: "activity.time" }, render: row => <ExternalLink to={`https://strava.com/activities/${row.activity.id}`}>{formatSeconds(row.activity.time)}</ExternalLink> },
        { header: "Čas TT", align: "right", sort: { id: "activityResult.trailtourTime" }, render: row => row.activityResult.trailtourTime && formatSeconds(row.activityResult.trailtourTime) },
        { header: "Body", align: "right", sort: { id: "activityResult.points" }, render: row => row.activityResult.points },
        { header: "Body TT", align: "right", sort: { id: "activityResult.trailtourPoints" }, render: row => row.activityResult.trailtourPoints }
    ];

    const tableData = resultData.filter(val => val.athlete.gender === filter);

    const link = (text, count) => (
        <p>{`${text} (${count})`}</p>
    );

    return (
        <PageBox>
            <Box>
                <div className="p-2 flex flex-row items-center justify-center sm:justify-end">
                    <div onClick={() => setFilter("M")} className={`${tableClasses.className} ${filter === "M" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("muži", countData.M)}</div>
                    <div onClick={() => setFilter("F")} className={`${tableClasses.className} ${filter === "F" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("ženy", countData.F)}</div>
                    <div onClick={() => setFilter("C")} className={`${tableClasses.className} ${filter === "C" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("kluby", countData.C)}</div>
                </div>
                <Table options={tableOptions} data={tableData} />
            </Box>
        </PageBox>
    )

}

export default StageList;