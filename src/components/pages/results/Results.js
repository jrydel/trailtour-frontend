import React from "react";
import { PageTitle, PageContent, PageMenu } from "../layout/Page";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import NavLink, { pageClasses } from "../../utils/NavUtils";
import { FiMap, FiAlignJustify } from "react-icons/fi";

const Results = props => {

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <PageTitle>Výsledky</PageTitle>
                <PageMenu>
                    <NavLink to="" component={Link} classes={pageClasses} exact={true} ><FiMap className="mr-2" />Muži</NavLink>
                    <NavLink to="zeny" component={Link} classes={pageClasses} ><FiAlignJustify className="mr-2" />Ženy</NavLink>
                    <NavLink to="kluby" component={Link} classes={pageClasses} ><FiAlignJustify className="mr-2" />Kluby</NavLink>
                </PageMenu>
            </div>
            <PageContent>
                <Outlet />
            </PageContent>
        </>
    )
}

export default Results;