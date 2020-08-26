import React from "react";

import useSWR from "swr";
import moment from "moment";

import { FiUser, FiUsers } from "react-icons/fi";

import Page, { PageTitle, PageError, PageBox, PageLoading } from "../layout/Page";
import { defaultGetOptions, fetcher, API_URL } from "../../utils/FetchUtils";
import { formatStageNumber, formatSeconds, formatNumberWithDefault } from "../../utils/FormatUtils";
import { ExternalLink, AppLink } from "../../utils/NavUtils";
import { Box } from "../../utils/LayoutUtils";
import { TablePagination } from "../../utils/TableUtils";

const FeedPage = () => {

    const limit = 50;
    const [page, setPage] = React.useState(0);
    const { data, error } = useSWR(`${API_URL}/getFeed?database=trailtour&limit=${limit}&offset=${page * limit}`, url => fetcher(url, defaultGetOptions));

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
                        <FiUser className="mr-2" />
                        <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink>
                    </div>
                    {
                        row.club_name &&
                        <div className="flex flex-row items-center">
                            <FiUsers className="mr-2" />
                            <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink>
                        </div>
                    }
                </div>
            </Col>
            <Col className="justify-center"><ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink></Col>
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
                </Box>
            </PageBox>
        </Page>
    )
}

export default FeedPage;