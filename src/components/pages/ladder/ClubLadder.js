import React from "react";
import useSWR from "swr";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { Table, FlexTable } from "../../utils/TableUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber } from "../../utils/FormatUtils";

const ClubLadder = () => {

    const { data: ladderData, error: ladderError } = useSWR(`${API_URL}/getClubLadder?database=trailtour`, url => fetcher(url, defaultGetOptions));

    if (ladderError) {
        console.log(ladderError);
        return <PageError full={false} />
    }
    if (!ladderData) return <PageLoading full={false} />

    const tableOptions = [
        { header: "Pozice TT", align: "center", sort: { id: "trailtour_position" }, render: row => row.trailtour_position ? formatNumber(row.trailtour_position) : "" },
        { header: "Jméno", align: "center", sort: { id: "club_name" }, render: row => <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink> },
        { header: "Body TT", align: "left", sort: { id: "trailtour_points", direction: "desc" }, render: row => row.trailtour_points ? formatNumber(row.trailtour_points, 2) : "" },
    ];

    return (
        <PageBox>
            <Box>
                <FlexTable options={tableOptions} data={ladderData} />
            </Box>
        </PageBox>
    )
}

export default ClubLadder;