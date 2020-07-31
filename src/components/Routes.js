import React from "react";

import Dashboard from "./pages/Dashboard";
import Stage from "./pages/stages/Stage";
import Stages from "./pages/stages/Stages";
import StagesMap from "./pages/stages/StagesMap";
import StagesList from "./pages/stages/StagesList";
import NotFound from "./pages/NotFound";
import Athlete from "./pages/athlete/Athlete";
import StageList from "./pages/stages/StageList";
import StageMap from "./pages/stages/StageMap";
import Club from "./pages/club/Club";
import Ladder from "./pages/ladder/Ladder";
import ClubLadder from "./pages/ladder/ClubLadder";
import AthleteLadder from "./pages/ladder/AthleteLadder";

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
        path: "/poradi",
        element: <Ladder />,
        children: [
            {
                path: "muzi",
                element: <AthleteLadder gender="M" />
            },
            {
                path: "zeny",
                element: <AthleteLadder gender="F" />
            },
            {
                path: "kluby",
                element: <ClubLadder />
            }
        ]
    },
    {
        path: "/zavodnik/:id",
        element: <Athlete />
    },
    {
        path: "/klub/:id",
        element: <Club />
    },
    {
        path: "*",
        element: <NotFound />
    },
]; 