import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import SplunkVisualization from '@splunk/visualizations/common/SplunkVisualization';
import mapStyleDark from './map-style.json';

const MyMapComponent = withScriptjs(
    withGoogleMap(() => (
        <GoogleMap
            defaultZoom={3}
            defaultCenter={{
                lat: 40.7484445, // latitude for the center of the map
                lng: -73.9878584, // longitude for the center of the map
            }}
            defaultOptions={{
                styles: mapStyleDark,
                disableDefaultUI: true, // disable default map UI
                draggable: true, // make map draggable
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale control
                scrollwheel: true, // allow scroll wheel
            }}
        />
    ))
);

const CustomMap = () => {
    return (
        <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=<YOUR_KEY_HERE>"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `calc(100vh - 10px)` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
};

CustomMap.propTypes = {
    ...SplunkVisualization.propTypes,
};

CustomMap.defaultProps = {
    ...SplunkVisualization.defaultProps,
};

export default CustomMap;
