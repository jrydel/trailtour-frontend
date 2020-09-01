import React from "react";
import useSWR from "swr";

import { FiUser, FiUsers } from "react-icons/fi";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { Table, TableRow, TableCol, FlexTable } from "../../utils/TableUtils";
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
        { header: "Pozice TT", align: "center", sort: { id: "trailtour_position" }, render: row => row.trailtour_position ? formatNumber(row.trailtour_position) : "" },
        {
            header: "Jméno", align: "left", sort: { id: "athlete_name" }, render: row =>
                <div className="flex flex-col items-center sm:items-start">
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
        },
        { header: "Etap", align: "center", sort: { id: "stage_count" }, render: row => formatNumber(row.stage_count) },
        { header: "Body TT", align: "center", sort: { id: "trailtour_points", direction: "desc" }, render: row => row.trailtour_points ? formatNumber(row.trailtour_points, 2) : "" },
    ];

    return (
        <PageBox>
            <Box>
                <FlexTable options={tableOptions} data={ladderData} />
            </Box>
        </PageBox>
    )
}

export default AthleteLadder;