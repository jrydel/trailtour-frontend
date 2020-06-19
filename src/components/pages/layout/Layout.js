import React from "react";

import { useRoutes, useLocation } from "react-router";
import ReactGA from "react-ga";

import { routes } from "../../Routes";

export const LayoutContainer = ({ children }) => (<div className="container mx-auto max-w-screen-xl px-5 pb-5">{children}</div>);
export const NavbarContainer = ({ children }) => (<div className="container mx-auto max-w-screen-xl px-5">{children}</div>);

const Layout = () => {

    const router = useRoutes(routes);

    const location = useLocation();
    React.useEffect(() => {
        ReactGA.pageview(location.pathname);
    }, [location]);

    return (
        <div className="antialiased">
            <div className="bg-background min-h-screen">
                {router}
            </div>
        </div >
    );
}

export default Layout;