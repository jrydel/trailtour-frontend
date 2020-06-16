import React from "react";

import Changelog from "./pages/Changelog";
import Dashboard from "./pages/Dashboard";
import Stage from "./pages/stages/Stage";
import Stages from "./pages/stages/Stages";
import StagesMap from "./pages/stages/StagesMap";
import StagesList from "./pages/stages/StagesList";
import NotFound from "./pages/NotFound";
import Athlete from "./pages/athlete/Athlete";
import StageList from "./pages/stages/StageList";
import StageMap from "./pages/stages/StageMap";

export const routes = [
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/etapy",
        element: <Stages />,
        children: [
            {
                path: "mapa",
                element: <StagesMap />
            },
            {
                path: "seznam",
                element: <StagesList />
            }
        ]
    },
    {
        path: "/etapa/:number",
        element: <Stage />,
        children: [
            {
                path: "vysledky",
                element: <StageList />
            },
            {
                path: "mapa",
                element: <StageMap />
            }
        ]
    },
    {
        path: "/zavodnik/:id",
        element: <Athlete />
    },
    // {
    //     path: "/changelog",
    //     element: <Changelog />
    // },
    {
        path: "*",
        element: <NotFound />
    },
]; 