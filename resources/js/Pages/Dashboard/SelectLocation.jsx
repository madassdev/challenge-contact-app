import React, { useState } from "react";

import MapPicker from "react-google-map-picker";
import LocationPicker from "react-location-picker";

function SelectLocation({setData}) {
    const DefaultLocation = { lat: 10, lng: 106 };
    const DefaultZoom = 10;
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [location, setLocation] = useState(defaultLocation);

    function handleChangeLocation(e) {
        console.log(e)
       setD
    }

    return (
        <>

            <LocationPicker
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "400px" }} />}
                defaultPosition={defaultLocation}
                onChange={handleChangeLocation}
            />
        </>
    );
}

export default SelectLocation;
