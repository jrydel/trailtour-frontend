import React from 'react';
import LayoutPage, { PageHeader, PageTitle, PageContent, MarginBot } from './LayoutPage';
import { Box, Typography, ListItem, ListItemText, ListItemIcon, List, Checkbox } from '@material-ui/core';

const ChangelogPage = () => {

    const list = [
        {
            date: "2020-05-26",
            content: [
                "Na stránce závodníka se vedle jména vypisuje i jeho aktuální body a pozice v žebříčku.",
            ]
        },
        {
            date: "2020-05-23",
            content: [
                "Oprava updatů ze Stravy - data se teď aktualizují každou hodinu (8-23).",
                "Časosběrné ukládání dat."
            ]
        },
        {
            date: "2020-05-18",
            content: [
                "Stránka závodníka."
            ]
        },
        {
            date: "2020-05-15",
            content: [
                "Mapa všech segmentů + prokliky na jednotlívé etapy."
            ]
        },
        {
            date: "2020-05-12",
            content: [
                "Stránka novinek ze Stravy - data se aktualizují každých 30 min."
            ]
        },
        {
            date: "2020-05-08",
            content: [
                "Stránky jednotlivých etap.",
                "Prokliky na Strava segment, MapyCZ, Trailtour web.",
                "Prokliky na Strava aktivity závodníků.",
                "Administrace a vytváření etap."
            ]
        },
        {
            date: "2020-05-06",
            content: [
                "Spuštění webu.",
            ]
        }
    ]

    return (
        <LayoutPage pageLoading={false}>
            <PageHeader>
                <PageTitle>Changelog</PageTitle>
            </PageHeader>
            <PageContent>
                {list.map((item, key1) =>
                    <>
                        <Box key={key1}>
                            <Typography>
                                <Box fontWeight="fontWeightBold">
                                    {item.date}
                                </Box>
                            </Typography>
                            <MarginBot margin={5} />
                            <List component="ul">
                                {item.content.map((text, key2) =>
                                    <ListItem key={key2} style={{ padding: 0 }}>
                                        <ListItemIcon>
                                            <Checkbox checked style={{ color: "#43A047" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                        <MarginBot margin={40} />
                    </>
                )}
            </PageContent>
        </LayoutPage >
    );
}

export default ChangelogPage;