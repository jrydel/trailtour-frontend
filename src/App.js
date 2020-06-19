import React from "react";

import { BrowserRouter } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga";

import "./assets/css/styles.css";
import Layout from "./components/pages/layout/Layout";

const App = () => {

    // globalni locale
    moment.locale("cs");

    // analytics
    ReactGA.initialize("UA-167777796-1");

    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;
