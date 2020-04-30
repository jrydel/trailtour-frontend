import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSnackbar } from 'notistack';

import LayoutPage from '../LayoutPage';
import MapComponent from '../MapComponent';
import { useFetch } from "../FetchApi";
import { API_URL } from '../../AppContext';
import { TableComponent } from '../TableComponent';


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

const StagesPage = props => {

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

    const tableColumns = [
        { name: 'number', title: 'Číslo' },
        { name: 'name', title: 'Název' },
        { name: 'distance', title: 'Délka' },
        { name: 'elevation', title: 'Převýšení' },
        { name: 'type', title: 'Typ' },
    ]
    const tableSort = [{ columnName: "number", direction: "asc" }];
    const tableData = apiData.data.filter(entry => entry.country === selectedCountry.country);

    const pageContent = (
        <>
            <Grid item xs={12} >
                <Box display={{ xs: "none", md: "block" }}>
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
                </Box>
            </Grid>
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
            <Grid item xs={12}>
                {apiData.loading ? <CircularProgress /> : <TableComponent rows={tableData} columns={tableColumns} sort={tableSort} />}
            </Grid>
        </>
    )

    return (
        <LayoutPage pageTitle={"Etapy"} pageContent={pageContent} />
    );
}

export default StagesPage;