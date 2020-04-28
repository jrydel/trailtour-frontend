import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import MapComponent from '../components/MapComponent';
import SegmentsDialog from '../components/segments/SegmentsDialog';
import SegmnetsTable from '../components/segments/SegmentsTable';
import { UserContext } from '../AppContext';
import { useFetch, postApiRequest } from "../core/FetchApi";

import { useSnackbar } from 'notistack';

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
    name: "",
    country: "",
    distance: "",
    elevation: "",
    type: "",
    latitude: "",
    longitude: ""
}

const API_URL = "https://api.orank.cz/trailtour";

const SegmentsPage = props => {

    const { enqueueSnackbar } = useSnackbar();

    const { session } = React.useContext(UserContext);

    const [countryTab, setCountryTab] = React.useState(0);
    const [selectedCountry, setSelectedCountry] = React.useState(countryData[countryTab]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("");
    const [formData, setFormData] = React.useState(initFormData);

    const [apiData, triggerApiData] = useFetch(API_URL + "/getSegments", [], error => showSnackbar(error, "error"));

    const openModal = (title, rowData) => {
        setModalTitle(title);
        setFormData(rowData);
        setModalShow(true);
    }
    const closeModal = () => {
        setModalTitle(null);
        setFormData(initFormData);
        setModalShow(false);
    }
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    const deleteSegment = (rowData) => {
        postApiRequest(API_URL + "/deleteSegment", rowData, error => showSnackbar(error, "error"), () => showSnackbar("Segment byl smazán.", "success"));
        triggerApiData();
        closeModal();
    }

    const saveSegment = (formData) => {
        postApiRequest(API_URL + "/saveSegment", formData, error => showSnackbar(error, "error"), () => showSnackbar("Segment byl uložen.", "success"));
        triggerApiData();
        closeModal();
    }

    const handleCountryTabChange = (event, value) => {
        setCountryTab(value);
        setSelectedCountry(countryData[value]);
    };

    const tableData = apiData.data.filter(entry => entry.country === selectedCountry.country);

    return (
        <>
            <Grid item xs={12} >
                <MapComponent
                    viewport={
                        {
                            height: "400px",
                            width: "100%",
                            center: [selectedCountry.coordinates.latitude, selectedCountry.coordinates.longitude],
                            zoom: selectedCountry.coordinates.zoom
                        }
                    }
                    data={tableData}
                />
            </Grid>
            <Grid container direction="row" justify="space-between" alignItems="center" item xs={12}>
                <Grid item>
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
                </Grid>
                <Grid item>
                    {session.role === "admin" && <Button variant="contained" color="primary" onClick={() => openModal("Vytvořit segment", initFormData)}>Vytvořit</Button>}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {apiData.loading ? (
                    <CircularProgress />
                ) : (
                        <SegmnetsTable
                            admin={session.role === "admin"}
                            data={tableData}
                            onRowEditClick={openModal}
                            onRowDeleteClick={deleteSegment}
                        />
                    )
                }
            </Grid>
            <SegmentsDialog
                title={modalTitle}
                show={modalShow}
                data={formData}
                onClose={closeModal}
                onSubmit={saveSegment}
            ></SegmentsDialog>
        </>
    );
}

export default SegmentsPage;