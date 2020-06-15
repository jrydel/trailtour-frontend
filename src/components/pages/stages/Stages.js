import React from "react";

import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { FiMapPin, FiList } from "react-icons/fi";

import Page, { PageTitle, PageHeader } from "../layout/Page";

import NavLink, { pageClasses } from "../../utils/NavUtils";

const Stages = props => {

    return (
        <Page>
            <PageHeader>
                <PageTitle>Etapy</PageTitle>
                <div className="flex flex-row items-center justify-between">
                    <NavLink to="" component={Link} classes={pageClasses} exact={true} ><FiMapPin className="mr-2" />Mapa</NavLink>
                    <NavLink to="seznam" component={Link} classes={pageClasses} ><FiList className="mr-2" />Seznam</NavLink>
                </div>
            </PageHeader>
            <Outlet />
        </Page>
    )
}

export default Stages;