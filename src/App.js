import React from "react";

import { BrowserRouter } from "react-router-dom";

import "./assets/css/styles.css";
import Layout from "./components/pages/layout/Layout";

const App = () => {

    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;
