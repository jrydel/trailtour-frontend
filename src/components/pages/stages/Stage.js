import React from "react";

import { useParams, Outlet, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";

import Page, { PageTitle, PageBox, PageError, PageLoading } from "../layout/Page";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";
import NavLink, { ExternalLink, pageClasses, lastUrlPath } from "../../utils/NavUtils";
import { formatStageNumber } from "../../utils/FormatUtils";
import StravaImage from "../../../assets/images/strava.jpg";
import MapyCZImage from "../../../assets/images/mapycz.png";
import TrailtourImage from "../../../assets/images/trailtour.jpg";
import { FiMapPin, FiList, FiHelpCircle } from "react-icons/fi";
import ReactStars from "react-stars";

const Stage = () => {

    const { number } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const path = lastUrlPath(location.pathname);

    React.useEffect(() => {
        if (path === number) {
            navigate("vysledky", { replace: true });
        }
    }, [path]);

    const [rating, setRating] = React.useState();
    const { data: stageData, error: stageDataError } = useSWR(`${API_URL}/getStage?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));
    const { data: countData, error: countDataError } = useSWR(`${API_URL}/getStageCounts?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (stageDataError || countDataError) {
        console.log(stageDataError, countDataError);
        return <PageError />
    }

    if (!stageData || !countData) return <PageLoading full={true} />

    const stageRating = stageData.rating_sum / stageData.rating_votes;

    const onRatingChange = newRating => {
        fetch(`${API_URL}/saveStageRating?database=trailtour`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "stage_number": `${number}`, "rating": newRating.toFixed(1) })
        }).then(() => mutate(`${API_URL}/getStage?database=trailtour&number=${number}`));
    }

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <PageTitle>{`${formatStageNumber(number)} - ${stageData.name}`}</PageTitle>
                        <div className="flex flex-row">
                            <ReactStars count={5} size={30} value={stageRating} onChange={newRating => onRatingChange(newRating)} className="ml-2 lg-ml-0" color2={'#ffd700'} />
                            <p className="text-sm">{`(${stageData.rating_votes})`}</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <ExternalLink to={stageData.strava_url} className={pageClasses.className}><img className="w-15 h-10 rounded mx-1" src={StravaImage} alt="Strava" /></ExternalLink>
                        <ExternalLink to={stageData.mapycz_url} className={pageClasses.className}><img className="w-15 h-10 rounded mx-1" src={MapyCZImage} alt="MapyCZ" /></ExternalLink>
                        <ExternalLink to={stageData.trailtour_url} className={pageClasses.className}><img className="w-15 h-10 rounded mx-1" src={TrailtourImage} alt="Trailtour" /></ExternalLink>
                    </div>
                </div>
            </PageBox>
            <PageBox>
                <div className="flex flex-row items-center justify-center lg:justify-end">
                    <NavLink to="vysledky" component={Link} classes={pageClasses} ><FiList className="mr-2" />{`Výsledky (${countData.activityCount})`}</NavLink>
                    <NavLink to="mapa" component={Link} classes={pageClasses} exact={true} ><FiMapPin className="mr-2" />Mapa</NavLink>
                </div>
            </PageBox>
            <Outlet />
        </Page>
    )
}

export default Stage;