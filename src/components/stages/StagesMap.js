import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import { defaultGetOptions, API_URL, useFetch, loading } from '../utils/FetchUtils';
import { useSnackbar } from 'notistack';
import LayoutPageSimple from '../LayoutPageSimple';
import { CustomMarker } from '../utils/MapUtils';

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