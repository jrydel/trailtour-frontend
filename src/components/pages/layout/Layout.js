import React from "react";

import { useRoutes } from "react-router";

import { routes } from "../../Routes";
import Navbar from "./Navbar";

export const LayoutContainer = ({ children }) => (<div className="container mx-auto max-w-screen-xl px-4">{children}</div>);

const Layout = () => {

    const router = useRoutes(routes);

    return (
        <div className="antialiased">
            <div className="bg-background min-h-screen">
                <Navbar />
                <LayoutContainer>
                    {router}
                </LayoutContainer>
            </div>
        </div >
    );
}

export default Layout;