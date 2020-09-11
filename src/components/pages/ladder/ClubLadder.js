import React from "react";
import useSWR from "swr";

import { FiUsers } from "react-icons/fi";
import { VscOutput, VscCircleSlash } from "react-icons/vsc";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber, formatPositionWithMedal } from "../../utils/FormatUtils";

const ClubLadder = () => {

    const { data: ladderData, error: ladderError } = useSWR(`${API_URL}/getClubs?database=trailtour`, url => fetcher(url, defaultGetOptions));

    if (ladderError) {
        console.log(ladderError);
        return <PageError full={false} />
    }
    if (!ladderData) return <PageLoading full={false} />

    const maxPoints = Math.max.apply(Math, ladderData.map(o => o.trailtour_points));

    return (
        <PageBox>
            <Box>
                <div className="flex flex-col">
                    {
                        ladderData.sort((a, b) => b.trailtour_points - a.trailtour_points).map((row, index) => {
                            const pointsText = row.trailtour_points ? `${formatNumber(row.trailtour_points, 2)} b.` : "0.00 b.";
                            const pointsDifferenceText = maxPoints === row.trailtour_points ? null : formatNumber(maxPoints - row.trailtour_points);
                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center border-b border-grey-light">
                                    <div className="w-full sm:w-1/12 flex flex-row items-center justify-center p-2"> {formatPositionWithMedal(row.trailtour_position)}</div>
                                    <div className="flex-1 flex flex-row justify-center sm:justify-start items-center p-2">
                                        <AppLink to={`/klub/${row.id}`}>{row.name}</AppLink>
                                    </div>
                                    <div className="flex-1 flex flex-row items-center justify-center p-2">
                                        <FiUsers className="min-w-icon min-h-icon mr-2" />
                                        {formatNumber(row.athletes_count)}
                                    </div>
                                    <div className="flex-1 flex flex-row items-center justify-center p-2">
                                        <VscOutput className="min-w-icon min-h-icon mr-2" />
                                        <div className="flex flex-col items-center">
                                            <span>{pointsText}</span>
                                            {pointsDifferenceText && <span className="text-sm text-danger">{`-${pointsDifferenceText} b.`}</span>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Box>
        </PageBox>
    )
}

export default ClubLadder;