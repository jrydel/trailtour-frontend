import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';

import LayoutPage from '../LayoutPage';
import MapComponent from '../MapComponent';
import { useFetch, postApiRequest } from "../FetchApi";
import { API_URL, UserContext } from '../../AppContext';
import { StagesTable } from './StagesTable';
import { Paper } from '@material-ui/core';
import StagesModalForm from './StagesModalForm';

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(2)
    },
    createButton: {
        marginLeft: theme.spacing(1)
    }
}));

const countryData = {
    0: {
        country: "cz",
        coordinates: {
            latitude: 49.8037633,
            longitude: 15.4749126,
            zoom: 7
        }
    },
    1: {
        country: "sk",
        coordinates: {
            latitude: 48.6737532,
            longitude: 19.696058,
            zoom: 7
        }
    }
}

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
    const [selectedCountry, setSelectedCountry] = React.useState(countryData[countryTab]);
    const handleCountryTabChange = (event, value) => {
        setCountryTab(value);
        setSelectedCountry(countryData[value]);
    };

    // api data
    const [apiData, trigger] = useFetch(
        API_URL + "/getStages",
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const filteredTableData = apiData.data.filter(entry => entry.country === selectedCountry.country);

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
            API_URL + "/saveStage",
            formData,
            () => showSnackbar("Segment byl uložen.", "success"),
            error => showSnackbar("Segment se nepodařilo uložit.", "error")
        );
        await trigger();
        closeModal();
    }

    const pageContent = (
        <>
            <Grid item xs >
                <MapComponent
                    viewport={
                        {
                            height: "400px",
                            width: "100%",
                            center: [selectedCountry.coordinates.latitude, selectedCountry.coordinates.longitude],
                            zoom: selectedCountry.coordinates.zoom
                        }
                    }
                    data={filteredTableData}
                />
            </Grid>
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
                            <Button variant="contained" color="primary" disabled={apiData.error} className={classes.createButton} onClick={() => openModal("Vytvořit etapu", initFormData)}>Vytvořit</Button>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item xs className={classes.item}>
                {apiData.loading ? <CircularProgress /> : <StagesTable rows={filteredTableData} onRowEdit={openModal} />}
            </Grid>
            <StagesModalForm open={modalShow} title={modalTitle} handleClose={closeModal} handleSubmit={submitModal} formData={formData} />
        </>
    )

    return (
        <LayoutPage pageTitle={"Etapy"} pageContent={pageContent} />
    );
}

export default StagesPage;