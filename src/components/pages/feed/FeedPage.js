import React from "react";

import useSWR from "swr";
import moment from "moment";

import { FiUser, FiUsers, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { VscGitCompare, VscSettings } from "react-icons/vsc";
import { MdTimer } from "react-icons/md";

import Page, { PageTitle, PageError, PageBox, PageLoading } from "../layout/Page";
import { defaultGetOptions, fetcher, API_URL } from "../../utils/FetchUtils";
import { formatStageNumber, formatSeconds, formatNumber, formatNumberWithDefault } from "../../utils/FormatUtils";
import { ExternalLink, AppLink } from "../../utils/NavUtils";
import { Box } from "../../utils/LayoutUtils";
import { useStateValue } from "../../StateContext";

const groups = data => {
    const result = [];
    data.map(val => {
        const temp = moment(val.activity_created).startOf("hour").fromNow();
        return result.includes(temp) ? null : result.push(temp);
    });
    return result;
}


const FeedPage = () => {

    const limit = 50;
    const [page, setPage] = React.useState(0);
    const { data, error } = useSWR(`${API_URL}/getFeed?database=trailtour&limit=${limit}&offset=${page * limit}`, url => fetcher(url, defaultGetOptions));

    const [{ user }, dispatch] = useStateValue();
    const { data: compareResultsData, error: compareResultsError } = useSWR(user ? `${API_URL}/getAthleteResults?database=trailtour&id=${user.id}` : null, url => fetcher(url, defaultGetOptions));

    if (user && compareResultsError) {
        console.log(compareResultsError);
        return <PageError />
    }

    if (user && !compareResultsData) return <PageLoading full={true} />

    const Col = ({ children, className }) => (
        <div className={`px-2 flex flex-row items-center w-full ${className}`} >
            {children}
        </div >
    );

    const Row = ({ row }) => {
        return <div className="flex flex-col sm:flex-row items-center justify-between border-b border-grey-light min-h-table p-4 sm:p-0">
            <Col className="justify-center">{moment(row.activity_created).startOf("hour").fromNow()}</Col>
            <Col className="justify-center sm:justify-start"><AppLink to={`/etapa/${row.stage_number}`}>{formatStageNumber(row.stage_number) + " - " + row.stage_name}</AppLink></Col>
            <Col className="justify-center sm:justify-start">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <FiUser className="mr-2 w-8" />
                        <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink>
                    </div>
                    {
                        row.club_name &&
                        <div className="flex flex-row items-center">
                            <FiUsers className="mr-2 w-8" />
                            <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink>
                        </div>
                    }
                </div>
            </Col>
            <Col className="justify-center">
                <ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>
                    {formatSeconds(row.activity_time)}
                </ExternalLink>
                {user &&
                    < div className={row.activity_time === row.compare_activity_time ? "bg-blue-400" : row.activity_time > row.compare_activity_time ? "bg-green-400" : "bg-red-400"}>
                        <p>{formatSecondsWithDefault(row.compare_trailtour_time, " --- ")} {row.compare_activity_id ? <ExternalLink to={`https://strava.com/activities/${row.compare_activity_id}`}>{`(${formatSeconds(row.compare_activity_time)})`}</ExternalLink> : " --- "}</p>
                    </div>
                }
            </Col>
            <Col className="justify-center">{formatNumberWithDefault(row.trailtour_points, " --- ")} ({formatNumberWithDefault(row.points, " --- ")})</Col>
            <Col className="justify-center">{row.activity_position}</Col>
        </div>
    };

    if (error) {
        return <PageError full={true} />
    }
    if (!data) return <PageLoading full={true} />

    const lastPage = Math.round(data.count / limit);
    const lastUpdate = moment(data.lastUpdate).format("HH:mm:ss");
    const groupData = groups(data.data);

    data.data.map(item => {
        const temp = compareResultsData?.find(val => val.stage_number === item.stage_number);
        if (temp) {
            item.compare_trailtour_points = temp.trailtour_points;
            item.compare_points = temp.points;
            item.compare_activity_time = temp.activity_time;
        }
    });

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>Novinky</PageTitle>
                    <span>{`Poslední aktualizace: ${lastUpdate}`}</span>
                </div>
            </PageBox>
            <PageBox>
                {
                    groupData.map((group, index) => {
                        return (
                            <div key={index}>
                                <span className="ml-2 text-sm">{group}</span>
                                {
                                    data.data.filter(val => moment(val.activity_created).startOf("hour").fromNow() === group).map((row, index2) => {
                                        return (
                                            <Box key={index2} className="flex flex-col sm:flex-row items-center justify-between p-4">
                                                <div className="flex flex-col w-full sm:w-1/3 items-center sm:items-start">
                                                    <div className="flex flex-row items-center">
                                                        <FiUser className="min-w-icon min-h-icon mr-1" />
                                                        <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink>
                                                    </div>
                                                    {
                                                        row.club_id && (
                                                            <div className="flex flex-row items-center">
                                                                <FiUsers className="min-w-icon min-h-icon mr-1" />
                                                                <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="flex flex-row w-full sm:w-1/3 items-center justify-center sm:justify-start">
                                                    <FiMapPin className="min-w-icon min-h-icon mr-1" />
                                                    <AppLink to={`/etapa/${row.stage_number}`}>{formatStageNumber(row.stage_number) + " - " + row.stage_name}</AppLink>
                                                </div>
                                                <div className="flex flex-col w-full sm:w-1/3 items-center sm:items-end">
                                                    <div className="flex flex-row items-center">
                                                        <MdTimer className="min-w-icon min-h-icon mr-1" />
                                                        <ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink>
                                                        <span className="ml-1">({row.activity_position})</span>
                                                    </div>
                                                    {user && row.compare_activity_time &&
                                                        <div className={`flex flex-row items-center ${row.activity_time === row.compare_activity_time ? "bg-blue-400" : row.activity_time > row.compare_activity_time ? "bg-green-400" : "bg-red-400"}`}>
                                                            <VscGitCompare className="min-w-icon min-h-icon mr-1" />
                                                            <span>{formatSeconds(row.compare_activity_time, " --- ")}</span>
                                                        </div>
                                                    }
                                                    <div className="flex flex-row items-center">
                                                        <div className="flex flex-row items-center">
                                                            {
                                                                row.trailtour_points ?
                                                                    (
                                                                        <div className="flex flex-col">
                                                                            <div className="flex flex-row items-center">
                                                                                <VscSettings className="min-w-icon min-h-icon mr-1" />
                                                                                <span>{`${formatNumber(row.trailtour_points, 2)} b. (TT)`}</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex flex-col items-center">
                                                                            <VscSettings className="min-w-icon min-h-icon mr-1" />
                                                                            <span>{`${formatNumber(row.points, 2)} b.`}</span>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Box>
                                        );
                                    })
                                }
                                <div className="mb-4" />
                            </div>
                        );
                    })
                }

                {/* <Box>
                    <div className="hidden sm:flex flex-row items-center justify-between border-b border-grey-light uppercase text-sm font-bold min-h-table">
                        <Col className="justify-center">Nahráno</Col>
                        <Col className="justify-left">Etapa</Col>
                        <Col className="justify-left">Závodník</Col>
                        <Col className="justify-center">Čas</Col>
                        <Col className="justify-center">Body TT (Body)</Col>
                        <Col className="justify-center">Pozice na segmentu</Col>
                    </div>
                    {
                        data.data.map((row, index) => <Row key={index} row={row} />)
                    }
                    <TablePagination page={page} lastPage={lastPage} onNextPageClick={() => setPage(prev => prev === lastPage ? prev : prev + 1)} onPreviousPageClick={() => setPage(prev => prev === 0 ? prev : prev - 1)} />
                </Box> */}
            </PageBox>
        </Page >
    )
}

export default FeedPage;