import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 37.787664,
    lng: -122.405942,
};

const SpotMap = ({ spot }) => {

    const [currPosition, setCurrPosition] = useState({ lat: spot.lat, lng: spot.lng })

    // Not good practice, should run it in the backend but this is faster for personal project
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    });


    return (
        <>
            {isLoaded && (
                <>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currPosition}
                        zoom={12}
                    >
                        <OverlayView
                            position={{ lat: spot.lat, lng: spot.lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div id="spotDetails-overlay-shadow">
                                <div id="spotDetails-overlay-container" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                </div>
                            </div>
                        </OverlayView>
                    </GoogleMap>
                </>
            )}
        </>
    );
};

export default SpotMap;