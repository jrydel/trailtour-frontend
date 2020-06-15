import React from "react";

import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { FiMapPin, FiList } from "react-icons/fi";

import { PageTitle, PageContent, PageMenu } from "../layout/Page";

import NavLink, { pageClasses } from "../../utils/NavUtils";

const Stages = props => {

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <PageTitle>Etapy</PageTitle>
                <PageMenu>
                    <NavLink to="" component={Link} classes={pageClasses} exact={true} ><FiMapPin className="mr-2" />Mapa</NavLink>
                    <NavLink to="seznam" component={Link} classes={pageClasses} ><FiList className="mr-2" />Seznam</NavLink>
                </PageMenu>
            </div>
            <PageContent>
                <Outlet />
            </PageContent>
        </>
    )
}

export default Stages;