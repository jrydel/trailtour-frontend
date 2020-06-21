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
    const { data: resultData, error: resultDataError } = useSWR(`${API_URL}/getStageResults?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));
    const { data: countData, error: countDataError } = useSWR(`${API_URL}/getResultsCount?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (resultDataError || countDataError) {
        console.log(resultDataError, countDataError);
        return <PageError full={false} />
    }

    if (!resultData || !countData) return <PageLoading full={false} />

    const tableOptions = [
        { header: "Pozice", align: "center", sort: { id: "position", direction: "asc" }, render: row => row.position },
        { header: "Jméno", align: "left", sort: { id: "athlete_name" }, render: row => <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink> },
        { header: "Klub", align: "left", sort: { id: "club_name" }, render: row => <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink> },
        { header: "Čas", align: "right", sort: { id: "activity_time" }, render: row => <ExternalLink to={`https://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink> },
        { header: "Body", align: "right", sort: { id: "points" }, render: row => row.points },
    ];

    const tableData = resultData.filter(val => val.athlete_gender === filter);

    const link = (text, count) => (
        <p>{`${text} (${count})`}</p>
    );

    return (
        <PageBox>
            <Box>
                <div className="p-2 flex flex-row items-center justify-center sm:justify-end">
                    <div onClick={() => setFilter("M")} className={`${tableClasses.className} ${filter === "M" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("muži", countData.M)}</div>
                    <div onClick={() => setFilter("F")} className={`${tableClasses.className} ${filter === "F" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("ženy", countData.F)}</div>
                    <div onClick={() => setFilter("C")} className={`${tableClasses.className} ${filter === "C" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("kluby", countData.C || "0")}</div>
                </div>
                <Table options={tableOptions} data={tableData} />
            </Box>
        </PageBox>
    )

}

export default StageList;