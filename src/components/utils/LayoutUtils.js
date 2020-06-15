import React from "react";

export const FlexBoxRow = ({ children }) => <div className="flex flex-row items-center justify-between">{children}</div>;

export const Box = ({ children, className }) => <div className={`${className || ""} bg-light border-l border-t border-r shadow-navbar rounded w-full`}>{children}</div>

export const Card = ({ title, children }) => {

    return <div className="bg-light border flex flex-col mt-2">
        <div class="p-2 border-b">
            <p className="font-bold text-navbar-dark p-2">{title}</p>
        </div>
        <div class="px-6 py-4">
            {children}
        </div>
    </div>
}