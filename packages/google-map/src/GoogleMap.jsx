import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import SplunkVisualization from "@splunk/visualizations/common/SplunkVisualization";
// import mapStyleDark from "./map-style.json";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => <GoogleMap {...props} />)
);

const CustomMap = ({ options }) => {
  return (
    <MyMapComponent
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB6PoOt3MgxIT5ORCqCk6HDuRj4ChE4h2Y"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `calc(100vh - 10px)` }} />}
      mapElement={<div style={{ height: `100%` }} />}
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