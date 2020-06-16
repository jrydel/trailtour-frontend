import React from "react";

import { Outlet, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FiMapPin, FiList } from "react-icons/fi";

import { PageTitle, PageBox } from "../layout/Page";

import NavLink, { pageClasses, lastUrlPath } from "../../utils/NavUtils";


const Stages = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const path = lastUrlPath(location.pathname);

    React.useEffect(() => {
        if (path === "etapy") {
            navigate("mapa", { replace: true });
        }
    }, [path]);

    return (
        <>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>Etapy</PageTitle>
                    <div className="flex flex-row items-center justify-between">
                        <NavLink to="mapa" component={Link} classes={pageClasses} exact={true} ><FiMapPin className="mr-2" />Mapa</NavLink>
                        <NavLink to="seznam" component={Link} classes={pageClasses} ><FiList className="mr-2" />Seznam</NavLink>
                    </div>
                </div>
            </PageBox>
            <Outlet />
        </>
    )
}

export default Stages;