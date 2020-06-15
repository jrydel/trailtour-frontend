import React from "react";

import { FiGitPullRequest } from "react-icons/fi";

import Page, { PageTitle, PageHeader, PageBox } from "./layout/Page";
import { Box } from "../utils/LayoutUtils";

const list = [
    {
        version: "v2.1.0",
        date: "15. června",
        content: [
            "Optimalizace a opravy chyb.",
            "Zlatý marker na mapě závodníka.",
            "Vyhledávač."
        ]
    },
    {
        version: "v2.0.0",
        date: "13. června",
        content: [
            "Nový design.",
        ]
    },
    {
        version: "v1.1.2",
        date: "27. května",
        content: [
            "Mapa etap na stránce závodníka.",
        ]
    },
    {
        version: "v1.1.1",
        date: "26. května",
        content: [
            "Na stránce závodníka se vedle jména vypisuje i jeho aktuální body a pozice v žebříčku.",
            "Stránka změn.",
        ]
    },
    {
        version: "v1.1.0",
        date: "23. května",
        content: [
            "Oprava updatů ze Stravy - data se teď aktualizují každou hodinu (8-23).",
            "Časosběrné ukládání dat."
        ]
    },
    {
        version: "v1.0.4",
        date: "18. května",
        content: [
            "Stránka závodníka."
        ]
    },
    {
        version: "v1.0.3",
        date: "15. května",
        content: [
            "Mapa všech segmentů + prokliky na jednotlivé etapy."
        ]
    },
    {
        version: "v1.0.2",
        date: "12. května",
        content: [
            "Stránka novinek ze Stravy - data se aktualizují každých 30 min."
        ]
    },
    {
        version: "v1.0.1",
        date: "8. května",
        content: [
            "Stránky jednotlivých etap.",
            "Prokliky na Strava segment, MapyCZ, Trailtour web.",
            "Prokliky na Strava aktivity závodníků.",
            "Administrace a vytváření etap."
        ]
    },
    {
        version: "v1.0.0",
        date: "6. května",
        content: [
            "Spuštění webu.",
        ]
    }
]

const Release = ({ version, date, children }) => {
    return <div className="flex flex-row mb-4">
        <div className="bg-success rounded-full h-10 w-10 flex flex-none items-center justify-center z-50"><FiGitPullRequest /></div>
        <Box className="ml-4 px-4 pt-4">
            <p className="text-dark font-bold text-xl ">{version}</p>
            <p className="text-gray-600 text-sm">{date}</p>
            <div className="p-4">
                {children}
            </div>
        </Box>
    </div>
}

const Changelog = props => {

    return (
        <Page>
            <PageHeader>
                <PageTitle>Changelog</PageTitle>
            </PageHeader>
            <PageBox>
                <div className={"relative flex flex-col"}>
                    <div className="w-changelog h-full border-r-2 border-success border-dotted absolute" />
                    {
                        list.map(({ version, date, content }, index) => {
                            return <Release key={index} version={version} date={date}>
                                <ul className="list-disc m-0 p-0">
                                    {
                                        content.map((val, index2) => <li key={index2} className="mb-2">{val}</li>)
                                    }
                                </ul>
                            </Release>
                        })
                    }
                </div>
            </PageBox>
        </Page>
    )
}

export default Changelog;