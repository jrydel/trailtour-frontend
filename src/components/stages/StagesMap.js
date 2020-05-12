import React from 'react';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Box } from '@material-ui/core';
import { AppLink } from '../Navigation';

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { defaultGetOptions, API_URL, useFetch, loading } from '../utils/FetchUtils';
import { useSnackbar } from 'notistack';
import { formatStageNumber, formatNumber } from '../utils/FormatUtils';
import LayoutPageSimple from '../LayoutPageSimple';

const StagesMap = props => {

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    const apiDataCZ = useFetch(
        API_URL + "/getStagesData?database=trailtour_cz",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const pageLoading = loading(apiDataCZ);

    const CustomMarker = props => (
        <>
            <Marker position={props.position} >
                <Popup>
                    <StageBox stage={props.stage} />
                </Popup>
            </Marker>
            <Polyline positions={props.data} color="red" />
        </>
    );

    const StageBox = props => (
        <Box display="flex" flexDirection="column" >
            <AppLink to={"/etapy/cz/" + props.stage.number} >{formatStageNumber(props.stage.number) + " - " + props.stage.name}</AppLink>
            <Box display="flex" flexDirection="row" alignItems="center" style={{ marginTop: 10 }}>
                <ArrowForwardIcon fontSize="small" />{props.stage.distance.toLocaleString("cz")} m
                <div style={{ marginLeft: 5 }} />
                <ArrowUpwardIcon fontSize="small" />{props.stage.elevation.toLocaleString("cz")} m
                <div style={{ marginLeft: 5 }} />
                <DirectionsRunIcon fontSize="small" />{formatNumber(props.stage.activities)}
            </Box>
        </Box>
    );

    return (
        <LayoutPageSimple
            pageLoading={pageLoading}
            pageContent={
                <Map
                    style={{ width: "100%", height: "100%" }}
                    center={[49.8037633, 15.4749126]}
                    zoom={8}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {apiDataCZ.data.map((stage, key) => {
                        const data = JSON.parse(stage.stravaData).latlng;
                        return <>
                            <CustomMarker
                                key={key}
                                position={data[0]}
                                stage={stage}
                                data={data}
                            />
                        </>
                    })}
                </Map >
            } />
    )
}

export default StagesMap;