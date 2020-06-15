import React from "react";

import { Routes, Route } from "react-router";

import Navbar from "./Navbar";
import Stages from "../stages/Stages";
import StagesMap from "../stages/StagesMap";
import StagesList from "../stages/StagesList";
import NotFound from "../NotFound";
import Stage from "../stages/Stage";
import Athlete from "../Athlete";
import Changelog from "../Changelog";
import Dashboard from "../Dashboard";

const Layout = () => {

    return (
        <div className="antialiased">
            <div className="bg-background min-h-screen">
                <Navbar />
                <div className="container mx-auto max-w-screen-xl p-4 flex flex-col">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="etapy" element={<Stages />}>
                            <Route path="/" element={<StagesMap />} />
                            <Route path="seznam" element={<StagesList />} />
                        </Route>
                        <Route path="etapa/:number" element={<Stage />} />
                        <Route path="zavodnik/:id" element={<Athlete />} />
                        <Route path="changelog" element={<Changelog />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div >
    );
}

export default Layout;