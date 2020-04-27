import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import MapComponent from '../components/MapComponent';
import SegmentsDialog from '../components/SegmentsDialog';
import SegmnetsTable from '../components/SegmentsTable';
import { UserContext } from '../AppContext';
import { useFetch } from "../core/useFetch";

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


const SegmentsPage = props => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { session } = React.useContext(UserContext);

    const [countryTab, setCountryTab] = React.useState(0);
    const [selectedCountry, setSelectedCountry] = React.useState(countryData[countryTab]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("");
    const [formData, setFormData] = React.useState(initFormData);

    const [tableData, triggerFetch] = useFetch('http://localhost:8080/getSegments', {}, []);

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
        fetch('http://localhost:8080/deleteSegment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rowData)
        })
            .then(res => {
                if (!res.ok) {
                    return new Error("asdasd");
                }
            })
            .then(closeModal)
            .then(showSnackbar("Segment byl smazán.", "success"))
            .then(triggerFetch)
            .catch((error) => showSnackbar(error, "error"));
    }

    const saveSegment = (formData) => {
        fetch('http://localhost:8080/saveSegment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) {
                    return new Error("asdasd");
                }
            })
            .then(closeModal)
            .then(showSnackbar("Segment byl uložen.", "success"))
            .then(triggerFetch)
            .catch((error) => showSnackbar(error, "error"));
    }

    const handleCountryTabChange = (event, value) => {
        setCountryTab(value);
        setSelectedCountry(countryData[value]);
    };

    const filteredData = tableData.data.filter((entry) => entry.country === selectedCountry.country);

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
                    data={filteredData}
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
                <SegmnetsTable
                    admin={session.role === "admin"}
                    tableData={filteredData}
                    onRowEditClick={openModal}
                    onRowDeleteClick={deleteSegment}
                />
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