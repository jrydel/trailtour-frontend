import React from "react";
import useSWR from "swr";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { Table } from "../../utils/TableUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber } from "../../utils/FormatUtils";

const AthleteLadder = ({ gender }) => {

    const { data: ladderData, error: ladderError } = useSWR(`${API_URL}/getAthleteLadder?database=trailtour&gender=${gender}`, url => fetcher(url, defaultGetOptions));

    if (ladderError) {
        console.log(ladderError);
        return <PageError full={false} />
    }
    if (!ladderData) return <PageLoading full={false} />

    const tableOptions = [
        { header: "Jméno", align: "center", sort: { id: "athlete_name" }, render: row => <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink> },
        { header: "Klub", align: "center", sort: { id: "club_name" }, render: row => <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink> },
        { header: "Body TT", align: "left", sort: { id: "trailtour_points", direction: "desc" }, render: row => row.trailtour_points ? formatNumber(row.trailtour_points) : "" },
        { header: "Pozice TT", align: "center", sort: { id: "trailtour_position" }, render: row => row.trailtour_position ? formatNumber(row.trailtour_position) : "" },
    ];

    return (
        <PageBox>
            <Box>
                <Table options={tableOptions} data={ladderData} />
            </Box>
        </PageBox>
    )
}

export default AthleteLadder;