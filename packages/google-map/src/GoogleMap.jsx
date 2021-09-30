import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";

const mapStyleDark = require('./map-style.json');

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 40.7484445, // latitude for the center of the map
                          lng: -73.9878584 // longitude for the center of the map
                      }}

        defaultOptions={{ 
          styles: mapStyleDark,
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale control
          scrollwheel: true // allow scroll wheel
       }}
      >
          </GoogleMap>
    ))
  );


export default class CustomGMap extends Component {
   
    constructor(props) {
        super(props);
      }

    render() {

        const {
            props: {}
              } = this;


        return (
                <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=<YOUR_KEY_HERE>"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - 10px)` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
        )
    }
}