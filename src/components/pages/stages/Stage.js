import React from "react";

import { useParams } from "react-router";
import useSWR from "swr";
import moment from "moment";

import Page, { PageTitle, PageBox, PageHeader, PageError, PageLoading } from "../layout/Page";
import { fetcher, defaultGetOptions } from "../../utils/FetchUtils";
import { ExternalLink, pageClasses, AppLink } from "../../utils/NavUtils";
import { Box } from "../../utils/LayoutUtils";
import { formatStageNumber, formatSeconds } from "../../utils/FormatUtils";
import { Table } from "../../utils/TableUtils";
import StravaImage from "../../../assets/images/strava.jpg";
import MapyCZImage from "../../../assets/images/mapycz.png";
import TrailtourImage from "../../../assets/images/trailtour.jpg";

const Stage = props => {

    moment.locale("cs");

    const { number } = useParams();

    const [filter, setFilter] = React.useState("M");

    const { data: stageData, error: stageDataError } = useSWR(`https://api.orank.cz/trailtour/getStage?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));
    const { data: resultsData, error: resultsError } = useSWR(`https://api.orank.cz/trailtour/getResults?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));
    const { data: countData, error: countDataError } = useSWR(`https://api.orank.cz/trailtour/getResultsCount?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (stageDataError || resultsError || countDataError) {
        console.log(stageDataError, resultsError, countDataError);
        return <PageError full={true} />
    }

    if (!stageData || !resultsData || !countData) return <PageLoading full={true} />

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

    const tableData = resultsData.filter(val => val.athlete.gender === filter);

    return (
        <Page>
            <PageHeader>
                <PageTitle><p className="truncate w-64 md:w-auto">{`${formatStageNumber(stageData.number)} - ${stageData.name}`}</p></PageTitle>
                <div className="flex flex-row items-center justify-between">
                    <ExternalLink to={stageData.stravaUrl} className={pageClasses.className}><img className="w-15 h-10 rounded" src={StravaImage} alt="Strava" /></ExternalLink>
                    <ExternalLink to={stageData.mapyczUrl} className={pageClasses.className}><img className="w-15 h-10 rounded ml-1" src={MapyCZImage} alt="MapyCZ" /></ExternalLink>
                    <ExternalLink to={stageData.trailtourUrl} className={pageClasses.className}><img className="w-15 h-10 rounded ml-1" src={TrailtourImage} alt="Trailtour" /></ExternalLink>
                </div>
            </PageHeader>
            <PageBox>
                <div className="flex flex-row items-center justify-center sm:justify-end ">
                    <div onClick={() => setFilter("M")} className={`${pageClasses.className} ${filter === "M" ? pageClasses.activeClassName : pageClasses.inactiveClassName}`}>{`Muži (${countData.M})`}</div>
                    <div onClick={() => setFilter("F")} className={`${pageClasses.className} ${filter === "F" ? pageClasses.activeClassName : pageClasses.inactiveClassName}`}>{`Ženy (${countData.F})`}</div>
                    <div onClick={() => setFilter("C")} className={`${pageClasses.className} ${filter === "C" ? pageClasses.activeClassName : pageClasses.inactiveClassName}`}>{`Kluby (${countData.C})`}</div>
                </div>
            </PageBox>
            <PageBox>
                <Box>
                    <Table options={tableOptions} data={tableData} />
                </Box>
            </PageBox>
        </Page>
    )
}

export default Stage;