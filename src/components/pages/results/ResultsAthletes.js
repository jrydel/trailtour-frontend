import React from "react";

import { useLocation } from "react-router";

import { PageTitle, PageContent } from "../layout/Page";

const ResultsAthletes = props => {

    const { pathname } = useLocation();
    const path = pathname.substring(pathname.lastIndexOf("/") + 1);

    return (
        <>
            <PageTitle>Výsledky atleti - {path}</PageTitle>
            <PageContent>

            </PageContent>
        </>
    )
}

export default ResultsAthletes;