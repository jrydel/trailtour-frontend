import React from "react";

import useSWR from "swr";
import { useParams } from "react-router";

import { FiUser, FiUsers } from "react-icons/fi";
import { VscOutput, VscCircleSlash } from "react-icons/vsc";

import Page, { PageError, PageLoading, PageBox, PageTitle } from "../layout/Page";
import { API_URL, fetcher, defaultGetOptions } from "../../utils/FetchUtils";
import { Box } from "../../utils/LayoutUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber, formatPosition } from "../../utils/FormatUtils";

import GoldMedal from "../../../assets/images/gold-medal.svg";
import SilverMedal from "../../../assets/images/silver-medal.svg";
import BronzeMedal from "../../../assets/images/bronze-medal.svg";

const Club = () => {

    const { id } = useParams();

    const { data: clubData, error: clubError } = useSWR(`${API_URL}/getClub?database=trailtour&id=${id}`, url => fetcher(url, defaultGetOptions));
    const { data: clubAthleteData, error: clubAthleteDataError } = useSWR(`${API_URL}/getClubAthletes?database=trailtour&id=${id}`, url => fetcher(url, defaultGetOptions));

    if (clubError || clubAthleteDataError) {
        console.log(clubAthleteData);
        return <PageError full />
    }
    if (!clubData || !clubAthleteData) return <PageLoading full />

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-start">
                    <PageTitle>{clubData.name}</PageTitle>
                    <div className="mx-3">
                        {(() => {
                            switch (clubData.trailtour_position) {
                                case 1:
                                    return <img className="w-8 h-8" src={GoldMedal} />;
                                case 2:
                                    return <img className="w-8 h-8" src={SilverMedal} />;
                                case 3:
                                    return <img className="w-8 h-8" src={BronzeMedal} />;
                                default:
                                    return <span>{formatPosition(clubData.trailtour_position)}</span>
                            }
                        })()}
                    </div>
                    <div className="flex flex-row items-center">
                        <FiUsers className="min-w-icon min-h-icon mr-2" />
                        <span>{clubData.athletes_count}</span>
                    </div>
                </div>
            </PageBox>
            <PageBox>
                <Box>
                    <div className="flex flex-col">
                        {
                            clubAthleteData.sort((a, b) => (b.trailtour_position != null ? b.trailtour_position : -Infinity) - (a.trailtour_position != null ? a.trailtour_position : -Infinity)).map((row, index) => {
                                const percent = row.trailtour_points ? row.trailtour_stages_count / 0.5 : 0;
                                const percentText = row.trailtour_points ? `${row.trailtour_stages_count}/50` : "0/50";
                                const bgColor = percent > 75 ? "bg-success" : percent > 50 ? "bg-yellow-500" : percent > 25 ? "bg-orange-500" : "bg-danger";

                                const positionText = row.trailtour_position ? formatPosition(row.trailtour_position) : "---";

                                const pointsText = row.trailtour_points ? `${formatNumber(row.trailtour_points, 2)} b.` : "0.00 b.";

                                const average = row.trailtour_points / row.trailtour_stages_count;
                                const averageText = `${formatNumber(average, 2, "0.00")} b.`;

                                return (
                                    <div key={index} className="flex flex-col sm:flex-row items-center border-b border-grey-light">
                                        <div className="w-full sm:w-1/12 flex flex-row justify-center p-2">
                                            {
                                                row.trailtour_position === 1 ? <img className="w-8 h-8" src={GoldMedal} /> : row.trailtour_position === 2 ? <img className="w-8 h-8" src={SilverMedal} /> : row.trailtour_position === 3 ? <img className="w-8 h-8" src={BronzeMedal} /> : <span>{positionText}</span>
                                            }
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center items-center sm:items-start p-2">
                                            <div className="flex flex-row items-center sm:items-left">
                                                <FiUser className="min-w-icon min-h-icon mr-2" />
                                                <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-row w-full justify-center p-2">
                                            <div className="flex-1 flex flex-row items-center justify-center relative bg-background rounded-md">
                                                <span className="z-50">{percentText}</span>
                                                <div className={`absolute left-0 top-0 w-full h-full ${bgColor} rounded-md text-center text-dark`} style={{ width: `${percent}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-row items-center justify-center p-2">
                                            <VscOutput className="min-w-icon min-h-icon mr-2" />
                                            <div className="flex flex-col items-center">
                                                <span>{pointsText}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-row items-center justify-center p-2">
                                            <VscCircleSlash className="min-w-icon min-h-icon mr-2" />
                                            <div className="flex flex-col items-center">
                                                <span>{averageText}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Box>
            </PageBox>
        </Page >
    )

}

export default Club;