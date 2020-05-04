import React from "react";

import { useSnackbar } from 'notistack';

import { useFetch, API_URL } from "../utils/FetchUtils";
import LayoutPage, { PageTitle } from "../LayoutPage";
import FeedTable from "./FeedTable";

const FeedPage = props => {

    const apiDataCZ = useFetch(
        API_URL + "/getFeed?database=trailtour_cz&limit=50",
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const apiDataSK = useFetch(
        API_URL + "/getFeed?database=trailtour_sk&limit=50",
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    const pageContent = (
        <FeedTable rows={[...apiDataCZ.data, ...apiDataSK.data]} />
    );

    return (
        <LayoutPage pageLoading={apiDataCZ.loading || apiDataSK.loading} pageTitle={<PageTitle>Novinky</PageTitle>} pageContent={pageContent}></LayoutPage>
    );
}

export default FeedPage;