import React from "react";

import Changelog from "./pages/Changelog";
import Dashboard from "./pages/Dashboard";
import Stage from "./pages/stages/Stage";
import Stages from "./pages/stages/Stages";
import StagesMap from "./pages/stages/StagesMap";
import StagesList from "./pages/stages/StagesList";
import Results from "./pages/results/Results";
import ResultsAthletes from "./pages/results/ResultsAthletes";
import ResultsClubs from "./pages/results/ResultsClubs";
import Athlete from "./pages/Athlete";

export const routes = [
    {
        path: "/",
        exact: true,
        element: <Dashboard />
    },
    {
        path: "/etapy",
        element: <Stages />,
        children: [
            {
                path: "/",
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
        element: <Stage />
    },
    // {
    //     path: "/vysledky",
    //     element: <Results />,
    //     children: [
    //         {
    //             path: "/",
    //             element: <ResultsAthletes />
    //         },
    //         {
    //             path: "zeny",
    //             element: <ResultsAthletes />
    //         },
    //         {
    //             path: "kluby",
    //             element: <ResultsClubs />
    //         },
    //     ]
    // },
    {
        path: "/zavodnik/:id",
        element: <Athlete />
    },
    {
        path: "/changelog",
        element: <Changelog />
    }
];