import React from 'react';

import { Grid, Box, Paper, Tabs, Tab, Button, makeStyles } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import LayoutPage, { PageTitle } from '../LayoutPage';
import { useFetch, postApiRequest, API_URL, defaultGetOptions, loading } from "../utils/FetchUtils";
import { UserContext } from '../../AppContext';
import StagesModalForm from './StagesModalForm';
import TableComponent from '../TableComponent';
import { formatNumber, formatStageNumber } from '../utils/FormatUtils';
import { AppLink } from '../Navigation';

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(2)
    },
    createButton: {
        marginLeft: theme.spacing(1)
    }
}));

const initFormData = {
    id: "",
    country: "",
    number: "",
    name: "",
    type: "",
    distance: "",
    elevation: "",
    latitude: "",
    longitude: ""
}

const StagesPage = props => {

    const { session } = React.useContext(UserContext);
    const classes = useStyles();

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // country
    const [countryTab, setCountryTab] = React.useState(0);
    const handleCountryTabChange = (event, value) => {
        setCountryTab(value);
    };

    // api data
    const apiDataCZ = useFetch(
        API_URL + "/getStages?database=trailtour_cz",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const apiDataSK = useFetch(
        API_URL + "/getStages?database=trailtour_sk",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const pageLoading = loading(apiDataCZ, apiDataSK);

    const tableOptions = [
        { id: "number", label: "Číslo", align: "center", sort: "number", render: row => formatStageNumber(row.number) },
        { id: "name", label: "Název", align: "left", sort: "name", render: row => <AppLink to={"/etapy/" + (props.tab === 0 ? "cz" : "sk") + "/" + row.number}>{row.name}</AppLink> },
        { id: "type", label: "Typ", align: "left", sort: "type", render: row => row.type },
        { id: "distance", label: "Délka (m)", align: "right", sort: "distance", render: row => formatNumber(row.distance) },
        { id: "elevation", label: "Převýšení (m)", align: "right", sort: "elevation", render: row => formatNumber(row.elevation) },
        { id: "activities", label: "Aktivity", align: "center", sort: "activities", render: row => formatNumber(row.activities) }
    ];
    const tableData = countryTab === 0 ? apiDataCZ.data : apiDataSK.data;

    // modal
    const [modalTitle, setModalTitle] = React.useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [formData, setFormData] = React.useState(initFormData);
    const openModal = (title, formData) => {
        setModalTitle(title);
        setFormData(formData);
        setModalShow(true);
    }
    const closeModal = () => {
        setModalShow(false);
    }
    const submitModal = async formData => {
        await postApiRequest(
            API_URL + "/saveStage?database=" + (formData.country === "CZ" ? "trailtour_cz" : "trailtour_sk"),
            formData,
            () => showSnackbar("Segment byl uložen.", "success"),
            error => showSnackbar("Segment se nepodařilo uložit.", "error")
        );
        closeModal();
    }

    const pageContent = (
        <>
            <Grid item xs className={classes.item}>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Paper square>
                            <Tabs
                                value={countryTab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleCountryTabChange}
                                centered
                            >
                                <Tab label="CZ" />
                                <Tab label="SK" />
                            </Tabs>
                        </Paper>
                    </Box>
                    {session.role === "admin" &&
                        <Box>
                            <Button variant="contained" color="primary" disabled={true} className={classes.createButton} onClick={() => openModal("Vytvořit etapu", initFormData)}>Vytvořit</Button>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item xs className={classes.item}>
                <TableComponent options={tableOptions} data={tableData} sort={{ key: "number", direction: "desc" }} />
            </Grid>
            <StagesModalForm open={modalShow} title={modalTitle} handleClose={closeModal} handleSubmit={submitModal} formData={formData} />
        </>
    )

    return (
        <LayoutPage
            pageLoading={pageLoading}
            pageTitle={<PageTitle>Etapy</PageTitle>}
            pageContent={pageContent}
        />
    );
}

export default StagesPage;