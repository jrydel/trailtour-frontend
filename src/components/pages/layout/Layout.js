import React from "react";

import { useRoutes } from "react-router";

import Navbar from "./Navbar";
import { routes } from "../../Routes";

const Layout = () => {

    let router = useRoutes(routes);

    return (
        <div className="antialiased">
            <div className="bg-background min-h-screen">
                <Navbar />
                <div className="container mx-auto max-w-screen-xl p-4 flex flex-col">
                    {router}
                </div>
            </div>
        </div >
    );
}

export default Layout;