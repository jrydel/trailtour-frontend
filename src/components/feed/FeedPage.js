import React from "react";

import { useSnackbar } from 'notistack';

import { useFetch } from "../FetchApi";
import { API_URL } from "../../AppContext";
import LayoutPage from "../LayoutPage";
import FeedTable from "./FeedTable";

const FeedPage = props => {

    const apiData = useFetch(
        API_URL + "/getFeed?limit=50",
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });


    const pageContent = (
        <FeedTable rows={apiData.data} />
    );

    return (
        <LayoutPage pageTitle={"Strava feed"} pageContent={pageContent}></LayoutPage>
    );
}

export default FeedPage;