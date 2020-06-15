import React from "react";

import useSWR from "swr";

import { formatStageNumber, formatNumber } from "../../utils/FormatUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { fetcher, defaultGetOptions } from "../../utils/FetchUtils";
import { Table } from "../../utils/TableUtils";
import { AppLink } from "../../utils/NavUtils";
import { Box } from "../../utils/LayoutUtils";

const StageList = props => {

    const { data, error } = useSWR("https://api.orank.cz/trailtour/getStages?database=trailtour_cz", url => fetcher(url, defaultGetOptions));

    const tableOptions = [
        { header: "Číslo", align: "center", sort: { id: "number", direction: "asc" }, render: row => formatStageNumber(row.number) },
        { header: "Název", align: "left", sort: { id: "name" }, render: row => <AppLink to={`/etapa/${row.number}`}>{row.name}</AppLink> },
        { header: "Typ", align: "left", sort: { id: "type" }, render: row => row.type },
        { header: "Délka (m)", align: "right", sort: { id: "distance" }, render: row => formatNumber(row.distance) },
        { header: "Převýšení (m)", align: "right", sort: { id: "elevation" }, render: row => formatNumber(row.elevation) },
        { header: "Aktivity", align: "right", sort: { id: "activities" }, render: row => formatNumber(row.activities) },
        {
            header: <button className="bg-primary text-white text-sm font-bold px-2 py-1 rounded" >Vytvořit</button>,
            align: "center",
            render: row => (
                <div className="flex flex-row items-center justify-center">
                    <button className="bg-success text-white text-sm font-bold px-2 py-1 mx-2 rounded" >Upravit</button>
                    <button className="bg-danger text-white text-sm font-bold px-2 py-1 rounded" >Smazat</button>
                </div>
            )
        },
    ];

    if (error) {
        return <PageError />
    }
    if (!data) return <PageLoading />

    return (
        <PageBox>
            <Box>
                <Table options={tableOptions} data={data} />
            </Box>
        </PageBox>
    );
}

export default StageList;