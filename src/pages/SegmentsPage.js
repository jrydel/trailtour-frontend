import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import MapBox from '../components/MapBox';
import SegmentsDialog from '../components/SegmentsDialog';
import SegmnetsTable from '../components/SegmentsTable';
import { UserContext } from '../AppContext';

const countryData = {
    0: {
        country: "cz",
        coordinates: {
            latitude: 49.8037633,
            longitude: 15.4749126,
            zoom: 6
        }
    },
    1: {
        country: "sk",
        coordinates: {
            latitude: 48.6737532,
            longitude: 19.696058,
            zoom: 6.3
        }
    }
}

const tempTableData = [
    {
        id: 123456798,
        name: "INOV-8 TRAILTOUR 2020",
        country: "cz",
        distance: 4655,
        elevation: 45,
        latitude: 49.8313800,
        longitude: 18.0424469,
        type: "Asfalt"
    },
    {
        id: 987654321,
        name: "INOV-8 TRAILTOUR 2020",
        country: "sk",
        distance: 8456,
        elevation: 235,
        latitude: 48.7349500,
        longitude: 19.6162383,
        type: "Terén"
    }
]

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

    const { session } = React.useContext(UserContext);

    const [tableData, setTabledata] = React.useState(tempTableData);

    const [countryTab, setCountryTab] = React.useState(0);
    const [selectedCountry, setSelectedCountry] = React.useState(countryData[countryTab]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("");
    const [formData, setFormData] = React.useState(initFormData);

    const openModal = (title, rowData) => {
        setModalTitle(title);
        setFormData(rowData);
        setModalShow(true);
    }

    const modalSubmit = (formData) => {
        setTabledata(tableData => [...tableData, formData]);
        setModalShow(false);
    }

    const handleCountryTabChange = (event, value) => {
        setCountryTab(value);
        setSelectedCountry(countryData[value]);
    };

    const filteredData = tableData.filter((entry) => entry.country === selectedCountry.country);

    return (
        <>
            <Grid item xs={12} >
                <MapBox
                    viewport={
                        {
                            height: "400px",
                            width: "100%",
                            latitude: selectedCountry.coordinates.latitude,
                            longitude: selectedCountry.coordinates.longitude,
                            zoom: selectedCountry.coordinates.zoom,
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
                <SegmnetsTable admin={session.role === "admin"} tableData={filteredData} onRowEditClick={openModal} />
            </Grid>
            <SegmentsDialog
                title={modalTitle}
                show={modalShow}
                data={formData}
                onClose={() => setModalShow(false)}
                onSubmit={modalSubmit}
            ></SegmentsDialog>
        </>
    );
}

export default SegmentsPage;