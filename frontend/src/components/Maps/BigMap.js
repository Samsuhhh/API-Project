import { useState } from 'react';
import './bigmap.css';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';

const SpotBigMap = ({onClose, spot, map}) => {
    // const {description, city, state, country} = spot
    // const [currPosition, setCurrPosition] = useState({ lat: parseFloat(lat), lng: parseFloat(lng) })

    // // Not good practice, should run it in the backend but this is faster for personal project
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    // });

    // console.log('$$$$$$$', lat, lng)

    // if (!lat || !lng) return null;

    return (
        <div id="BigMap-wrapper">
            <div id="fsModal-header">
                <div id="fsModal-close-div" onClick={() => onClose()}>
                    <svg transform="rotate(-90)" fill="#222222" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.735 511.735" xmlSpace="preserve" stroke="#222222" strokeWidth="50.4694"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.788,371.087L263.455,125.753c-4.16-4.16-10.88-4.16-15.04,0L2.975,371.087c-4.053,4.267-3.947,10.987,0.213,15.04 c4.16,3.947,10.667,3.947,14.827,0l237.867-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213 C512.734,381.753,512.734,375.247,508.788,371.087z"></path> </g> </g> </g></svg>
                </div>
            </div>
            <div id="fsModal-body">
                <div id="fsBody-left">{spot.description}</div>
                <div id="fsBody-right">{map}</div>
            </div>
        </div>
    )
}

export default SpotBigMap;