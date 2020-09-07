import React from "react";

export const FlexBoxRow = ({ children }) => <div className="flex flex-row items-center justify-between">{children}</div>;

export const Box = ({ children, className = "" }) => <div className={`${className} bg-light border-l border-t border-r shadow-navbar rounded`}>{children}</div>

export const Card = ({ title, children }) => {

    return <div className="bg-light border flex flex-col">
        <div className="flex items-center justify-center p-2 border-b">
            <span className="font-bold text-navbar-dark">{title}</span>
        </div>
        <div className="p-2">
            {children}
        </div>
    </div>
}