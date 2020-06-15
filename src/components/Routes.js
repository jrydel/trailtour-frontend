import React from "react";

import Changelog from "./pages/Changelog";
import Dashboard from "./pages/Dashboard";
import Stage from "./pages/stages/Stage";
import Stages from "./pages/stages/Stages";
import StagesMap from "./pages/stages/StagesMap";
import StagesList from "./pages/stages/StagesList";
import Athlete from "./pages/Athlete";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

export const routes = [
    {
        path: "login",
        element: <Login />
    },
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
    {
        path: "/zavodnik/:id",
        element: <Athlete />
    },
    {
        path: "/changelog",
        element: <Changelog />
    },
    {
        path: "*",
        element: <NotFound />
    },
]; 