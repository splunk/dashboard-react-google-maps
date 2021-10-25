import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import SplunkVisualization from "@splunk/visualizations/common/SplunkVisualization";
import mapStyleDark from "./map-style.json";
import {
  LoadingElement,
  ContainerElement,
  MapElement,
} from "./GoogleMapStyles";

const mapStyleOptions = (defaultOptions) => ({
  styles: mapStyleDark,
  ...defaultOptions,
});

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={props.defaultCenter}
      defaultOptions={mapStyleOptions(props.defaultOptions)}
    />
  ))
);

const CustomMap = ({ options }) => {
  return (
    <MyMapComponent
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=<YOUR_KEY_HERE>"
      loadingElement={<div style={LoadingElement} />}
      containerElement={<div style={ContainerElement} />}
      mapElement={<div style={MapElement} />}
      {...options}
    />
  );
};

CustomMap.config = {
  dataContract: {},
  optionsSchema: {},
  key: "splunk.CustomMap",
  name: "CustomMap",
};

CustomMap.propTypes = {
  ...SplunkVisualization.propTypes,
};

CustomMap.defaultProps = {
  ...SplunkVisualization.defaultProps,
};

export default CustomMap;
