import React from "react";

import { useRoutes } from "react-router";

import { routes } from "../../Routes";

const Layout = () => {

    const router = useRoutes(routes);
    console.log(router);

    return (
        <div className="antialiased">
            <div className="bg-background min-h-screen">
                {router}
            </div>
        </div >
    );
}

export default Layout;