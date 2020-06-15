import React from "react";
import { PageTitle, PageContent } from "../layout/Page";
import { useLocation, useParams } from "react-router";

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