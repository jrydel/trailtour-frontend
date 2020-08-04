import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga";

import "./assets/css/styles.css";
import Layout from "./components/pages/layout/Layout";
import reducer, { initialState } from "./components/reducer";
import { StateProvider } from "./components/StateContext";

// globalni locale
moment.locale("cs");

// analytics
ReactGA.initialize("UA-167777796-1");

const App = () => {

    return (
        <Router>
            <StateProvider initialState={initialState} reducer={reducer}>
                <Layout />
            </StateProvider>
        </Router>
    );
}

export default App;
