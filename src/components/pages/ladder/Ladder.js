import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import NavLink, { lastUrlPath, pageClasses } from "../../utils/NavUtils";

import Page, { PageTitle, PageBox } from "../layout/Page";
import { Link } from "react-router-dom";

import { FiMapPin, FiList } from "react-icons/fi";

const Ladder = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const path = lastUrlPath(location.pathname);

    React.useEffect(() => {
        if (path === "poradi") {
            navigate("/poradi/muzi", { replace: true });
        }
    }, [path]);

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>Celkové pořadí</PageTitle>
                    <div className="flex flex-row items-center justify-between">
                        <NavLink to="muzi" component={Link} classes={pageClasses} ><FiList className="mr-2" />Muži</NavLink>
                        <NavLink to="zeny" component={Link} classes={pageClasses} exact={true} ><FiList className="mr-2" />Ženy</NavLink>
                        <NavLink to="kluby" component={Link} classes={pageClasses} ><FiList className="mr-2" />Kluby</NavLink>
                    </div>
                </div>
            </PageBox>
            <Outlet />
        </Page>
    )
}

export default Ladder;