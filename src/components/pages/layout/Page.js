import React from "react";
import { LayoutContainer } from "./Layout";
import Navbar from "./Navbar";

export const PageBox = ({ children }) => <div className="mt-5">{children}</div>;
export const PageTitle = ({ children }) => <h1 className="truncate w-3/4 text-center sm:text-left text-2xl text-dark">{children}</h1>;

export const PageError = ({ full = true, status = 404, message = "Stránka nenalezena." }) => (
    full ?
        (
            <Page>
                <PageBox>
                    <div className="flex flex-col items-center">
                        <div className="text-dark text-6xl sm:text-404 font-bold">{status}</div>
                        <p className="text-dark text-xl sm:text-4xl font-light ">{message}</p>
                    </div>
                </PageBox>
            </Page>

        ) : (
            <div className="flex flex-col items-center">
                <div className="text-dark text-6xl sm:text-404 font-bold">{status}</div>
                <p className="text-dark text-xl sm:text-4xl font-light ">{message}</p>
            </div>
        )
);

export const PageLoading = ({ full = true }) => (
    full ?
        (
            <Page>
                <PageBox>
                    <div className="flex flex-col items-center justify-center"><div className="loader" /></div>
                </PageBox>
            </Page>
        ) : (
            <PageBox>
                <div className="flex flex-col items-center justify-center"><div className="loader" /></div>
            </PageBox>
        )
);

export const Page = ({ children }) => (
    <>
        <Navbar />
        <LayoutContainer>
            {children}
        </LayoutContainer>
    </>
)

export default Page;