import React from "react";

import useSWR from "swr";
import { useParams } from "react-router";
import Page, { PageError, PageLoading, PageBox, PageTitle } from "../layout/Page";
import { Table } from "../../utils/TableUtils";
import { API_URL, fetcher, defaultGetOptions } from "../../utils/FetchUtils";
import { Box } from "../../utils/LayoutUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber } from "../../utils/FormatUtils";

const Club = () => {

    const { id } = useParams();

    const { data: clubData, error: clubError } = useSWR(`${API_URL}/getClub?database=trailtour&id=${id}`, url => fetcher(url, defaultGetOptions));
    const { data: clubAthleteData, error: clubAthleteDataError } = useSWR(`${API_URL}/getClubAthletes?database=trailtour&id=${id}`, url => fetcher(url, defaultGetOptions));

    if (clubError || clubAthleteDataError) {
        console.log(clubAthleteData);
        return <PageError full />
    }
    if (!clubData || !clubAthleteData) return <PageLoading full />

    const tableOptions = [
        { header: "Jméno", align: "center", sort: { id: "athlete_name" }, render: row => <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink> },
        { header: "Etap", align: "left", sort: { id: "stage_count", direction: "desc" }, render: row => row.stage_count },
        { header: "Pozice TT", align: "center", sort: { id: "trailtour_position" }, render: row => formatNumber(row.trailtour_position) },
        { header: "Body TT", align: "right", sort: { id: "trailtour_points" }, render: row => formatNumber(row.trailtour_points) }
    ];

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>{clubData.name}</PageTitle>
                </div>
            </PageBox>
            <PageBox>
                <Box>
                    <Table options={tableOptions} data={clubAthleteData} />
                </Box>
            </PageBox>
        </Page >
    )

}

export default Club;