import React from "react";

import { useLocation, useResolvedLocation, Link, matchRoutes } from "react-router-dom";
import { routes } from "../Routes";

export const lastUrlPath = location => location.substring(location.lastIndexOf("/") + 1);

export const menuClasses = {
    className: "flex w-auto items-center sm:h-navbar p-2 sm:px-4 border-l-2 sm:border-l-0 sm:border-b-2 border-transparent text-dark transition duration-150 ease-in-out",
    activeClassName: "border-primary text-dark font-bold",
    inactiveClassName: "hover:bg-primary hover:bg-opacity-25 font-medium"
}

export const pageClasses = {
    className: "px-2 py-1 flex w-auto items-center border-b-2 border-transparent text-dark text-sm transition duration-150 ease-in-out cursor-pointer",
    activeClassName: "border-primary font-bold",
    inactiveClassName: "hover:bg-primary hover:bg-opacity-25 font-medium"
}

export const tableClasses = {
    className: "px-2 py-1 text-primary cursor-pointer",
    activeClassName: "font-bold underline",
    inactiveClassName: "hover:underline"
}

export const NavLink = ({ to, exact, classes, component: Component, ...rest }) => {
    const location = useLocation();
    const resolvedLocation = useResolvedLocation(to);
    const routeMatches = matchRoutes(routes, location);

    const isActive = exact ? location.pathname === resolvedLocation.pathname : routeMatches.some(match => match.pathname === resolvedLocation.pathname);

    const allClassNames = classes ? classes.className + (isActive ? ` ${classes.activeClassName}` : ` ${classes.inactiveClassName}`) : "";

    return <Component {...rest} to={to} className={allClassNames} />;
}

export const AppLink = ({ to, children }) => <Link to={to} className="text-primary hover:underline">{children}</Link>;
export const ExternalLink = ({ to, children }) => <a href={to} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>;

export default NavLink;