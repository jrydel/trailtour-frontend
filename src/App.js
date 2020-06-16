import React from "react";

import { BrowserRouter } from "react-router-dom";
import moment from "moment";

import "./assets/css/styles.css";
import Layout from "./components/pages/layout/Layout";

const App = () => {

    // globalni locale
    moment.locale("cs");

    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;
