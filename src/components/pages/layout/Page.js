import React from "react";

import Navbar from "./Navbar";

export const PageBox = ({ children }) => <div className="mt-5">{children}</div>;
export const PageHeader = ({ children }) => <div className="flex flex-col sm:flex-row items-center justify-around sm:justify-between h-header sm:h-headersm">{children}</div>
export const PageTitle = ({ children }) => <h1 className="text-2xl text-dark">{children}</h1>;

export const PageError = ({ full = false }) => full ? <Page><div className="flex flex-col items-center justify-center"><p>Error</p></div></Page> : <PageBox><div className="flex flex-col items-center justify-center"><p>Error</p></div></PageBox>;
export const PageLoading = ({ full = false }) => full ? <Page><div className="flex flex-col items-center justify-center"><div className="loader" /></div></Page> : <PageBox><div className="flex flex-col items-center justify-center"><div className="loader" /></div></PageBox>;

const Page = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-screen-xl px-4 py-5">
                {children}
            </div>
        </>
    );
}

export default Page;