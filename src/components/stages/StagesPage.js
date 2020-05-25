import React from 'react';

import { Grid, Box, Paper, Tabs, Tab, Button, makeStyles } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import LayoutPage, { PageTitle, PageContent, PageHeader } from '../LayoutPage';
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
    country: "",
    number: "",
    trailtourUrl: "",
    name: "",
    type: "",
    distance: "",
    elevation: ""
}

const tabData = [
    {
        label: "CZ",
        disabled: false
    },
    {
        label: "SK",
        disabled: true
    }
]

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
    const [trigger, setTrigger] = React.useState(false);
    const apiDataCZ = useFetch(
        API_URL + "/getStages?database=trailtour_cz",
        defaultGetOptions,
        [trigger],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const pageLoading = loading(apiDataCZ);

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
            API_URL + "/saveStage?database=" + (tabData[countryTab].label === "CZ" ? "trailtour_cz" : "trailtour_sk"),
            formData,
            () => {
                setTrigger(!trigger);
                showSnackbar("Segment byl uložen.", "success");
            },
            error => showSnackbar("Segment se nepodařilo uložit.", "error")
        );
        closeModal();
    }

    const tableOptions = [
        { id: "number", label: "Číslo", align: "center", sort: "number", render: row => formatStageNumber(row.number) },
        { id: "name", label: "Název", align: "left", sort: "name", render: row => <AppLink to={"/etapy/" + tabData[countryTab].label.toLowerCase() + "/" + row.number}>{row.name}</AppLink> },
        { id: "type", label: "Typ", align: "left", sort: "type", render: row => row.type },
        { id: "distance", label: "Délka (m)", align: "right", sort: "distance", render: row => formatNumber(row.distance) },
        { id: "elevation", label: "Převýšení (m)", align: "right", sort: "elevation", render: row => formatNumber(row.elevation) },
        { id: "activities", label: "Aktivity", align: "center", sort: "activities", render: row => formatNumber(row.activities) },
        { id: "actions", align: "center", render: row => session.role === "admin" && <Button variant="contained" color="secondary" size="small" onClick={() => openModal("Upravit etapu.", row)}>Upravit</Button> },
    ];
    const tableData = apiDataCZ.data;

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageHeader>
                <PageTitle>Etapy</PageTitle>
            </PageHeader>
            <PageContent>
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
                                {tabData.map(val => <Tab {...val} />)}
                            </Tabs>
                        </Paper>
                    </Box>
                    {session.role === "admin" &&
                        <Box>
                            <Button disabled variant="contained" color="primary" className={classes.createButton} onClick={() => openModal("Vytvořit etapu", initFormData)}>Vytvořit</Button>
                        </Box>
                    }
                </Box>
                <Grid item xs className={classes.item}>
                    <TableComponent options={tableOptions} data={tableData} sort={{ key: "number", direction: "asc" }} />
                </Grid>
                <StagesModalForm open={modalShow} title={modalTitle} handleClose={closeModal} handleSubmit={submitModal} formData={formData} country={tabData[countryTab].label} />
            </PageContent>
        </LayoutPage>
    );
}

export default StagesPage;