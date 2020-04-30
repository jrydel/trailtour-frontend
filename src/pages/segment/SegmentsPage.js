import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import LayoutPage from '../LayoutPage';
import MapComponent from '../../components/MapComponent';
import SegmentsDialog from '../../components/segment/SegmentsDialog';
import SegmnetsTable from '../../components/segment/SegmentsTable';
import { UserContext } from '../../AppContext';
import { useFetch, postApiRequest } from "../../core/FetchApi";

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

const initForm = {
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

    // session
    const { session } = React.useContext(UserContext);

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

    // dialog form
    const [formData, setFormData] = React.useState(initForm);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("");
    const openSegment = (rowData) => {
        console.log(rowData);
    }
    const openModal = (title, rowData) => {
        setModalTitle(title);
        setFormData(rowData);
        setModalShow(true);
    }
    const closeModal = () => {
        setModalTitle("");
        setFormData(initForm);
        setModalShow(false);
    }

    // api data
    const [apiData, trigger] = useFetch(
        API_URL + "/getSegments",
        [],
        error => showSnackbar(error, "error")
    );
    const tableData = apiData.data.filter(entry => entry.country === selectedCountry.country);

    // segment actions
    const saveSegment = async (formData) => {
        await postApiRequest(
            API_URL + "/saveSegment",
            formData,
            () => showSnackbar("Segment byl uložen.", "success"),
            error => showSnackbar("Segment se nepodařilo uložit.", "error"));
        trigger();
        closeModal();
    }

    const deleteSegment = async (rowData) => {
        await postApiRequest(
            API_URL + "/deleteSegment",
            rowData,
            () => showSnackbar("Segment byl smazán.", "success"),
            error => showSnackbar("Segment se nepodařilo smazat.", "error")
        );
        trigger();
        closeModal();
    }

    const pageContent = (
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
                    {session.role === "admin" && <Button variant="contained" color="primary" onClick={() => openModal("Vytvořit segment", formData)}>Vytvořit</Button>}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {apiData.loading ? (
                    <CircularProgress />
                ) : (
                        <SegmnetsTable
                            admin={session.role === "admin"}
                            data={tableData}
                            onRowOpenClick={openSegment}
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
    )

    return (
        <LayoutPage pageTitle={"Segmenty"} pageContent={pageContent} />
    );
}

export default SegmentsPage;