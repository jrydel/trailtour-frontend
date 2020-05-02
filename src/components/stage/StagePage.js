import React from "react";

import { Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';

import LayoutPage from "../LayoutPage";
import { StageTable } from "./StageTable";
import { useFetch } from "../FetchApi";
import { API_URL } from "../../AppContext";

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(2)
    }
}));

const StagePage = props => {

    const classes = useStyles();

    const segmentId = props.match.params.id;

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // api data
    const apiData = useFetch(
        API_URL + "/getResults?stageId=" + segmentId,
        [],
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    const [tabValue, setSelectedTabValue] = React.useState(0);
    const handleTabChange = (event, value) => {
        setSelectedTabValue(value);
    };

    const filteredTableData = apiData.data.filter(value => {
        if (tabValue === 0) {
            return value.athlete.gender === "M";
        } else {
            return value.athlete.gender === "F";
        }
    });

    const pageContent = (
        <>
            <Paper square>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    value={tabValue}
                    onChange={handleTabChange}
                >
                    <Tab label="Muži" />
                    <Tab label="Ženy" />
                </Tabs>
            </Paper>
            <div className={classes.item} />
            <StageTable rows={filteredTableData} />
        </>
    );

    return (
        <LayoutPage pageTitle={"Etapa"} pageContent={pageContent}></LayoutPage>
    );

}

export default StagePage;