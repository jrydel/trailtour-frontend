import React from "react";

import { useParams, Outlet, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useSWR from "swr";

import Page, { PageTitle, PageBox, PageError, PageLoading } from "../layout/Page";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";
import NavLink, { ExternalLink, pageClasses, lastUrlPath } from "../../utils/NavUtils";
import { formatStageNumber } from "../../utils/FormatUtils";
import StravaImage from "../../../assets/images/strava.jpg";
import MapyCZImage from "../../../assets/images/mapycz.png";
import TrailtourImage from "../../../assets/images/trailtour.jpg";
import { FiMapPin, FiList, FiHelpCircle } from "react-icons/fi";

const Stage = props => {

    const { number } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const path = lastUrlPath(location.pathname);

    React.useEffect(() => {
        if (path === number) {
            navigate("vysledky", { replace: true });
        }
    }, [path]);


    const { data: stageData, error: stageDataError } = useSWR(`${API_URL}/getStage?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (stageDataError) {
        console.log(stageDataError);
        return <PageError />
    }

    if (!stageData) return <PageLoading full={true} />

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>{`${formatStageNumber(stageData.number)} - ${stageData.name}`}</PageTitle>
                    <div className="flex flex-row items-center justify-between">
                        <ExternalLink to={stageData.stravaUrl} className={pageClasses.className}><img className="w-15 h-10 rounded mx-1" src={StravaImage} alt="Strava" /></ExternalLink>
                        <ExternalLink to={stageData.mapyczUrl} className={pageClasses.className}><img className="w-15 h-10 rounded mx-1" src={MapyCZImage} alt="MapyCZ" /></ExternalLink>
                        <ExternalLink to={stageData.trailtourUrl} className={pageClasses.className}><img className="w-15 h-10 rounded mx-1" src={TrailtourImage} alt="Trailtour" /></ExternalLink>
                    </div>
                </div>
            </PageBox>
            <PageBox>
                <div className="flex flex-row items-center justify-center sm:justify-end">
                    <NavLink to="vysledky" component={Link} classes={pageClasses} ><FiList className="mr-2" />{`Výsledky (${stageData.activities})`}</NavLink>
                    <NavLink to="mapa" component={Link} classes={pageClasses} exact={true} ><FiMapPin className="mr-2" />Mapa</NavLink>
                    <NavLink to="info" component={Link} classes={pageClasses} ><FiHelpCircle className="mr-2" />{`Info (${stageData.infos})`}</NavLink>
                </div>
            </PageBox>
            <Outlet />
        </Page>
    )
}

export default Stage;