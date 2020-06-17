import React from "react";

import { useRoutes } from "react-router";

import { routes } from "../../Routes";
import Navbar from "./Navbar";

export const LayoutContainer = ({ children }) => (<div className="container mx-auto max-w-screen-xl px-5 pb-5">{children}</div>);
export const NavbarContainer = ({ children }) => (<div className="container mx-auto max-w-screen-xl px-5">{children}</div>);

const Layout = () => {

    const router = useRoutes(routes);

    return (
        <div className="antialiased">
            <div className="bg-background min-h-screen">
                {router}
            </div>
        </div >
    );
}

export default Layout;