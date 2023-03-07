import React, { useEffect, useRef } from 'react';
import './Map.css';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
} from '@react-google-maps/api';

/** Component: Google Interactive Map
 * This is the interactive map that will display route query results */

const Map = (props) => {
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

  const containerStyle = {
    width: '100%',
    height: '90vh',
  };

  const panelStyle = {
    height: '75%',
    width: '30%',
    overflow: 'scroll',
    backgroundColor: 'white',
    position: 'relative',
    marginLeft: '50px',
    marginTop: '100px',
  };
  if (!props.directions) {
    panelStyle.display = 'none';
  }

  // The location for the center of the map
  const atlanta = {
    lat: 33.747366971178586,
    lng: -84.38854681301125,
    address: 'atlanta ga',
  };
  // The zoom level of the map
  const zoomLevel = 12;

  const limit = 1;
  let count = useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < limit) {
      if (res.status === 'OK') {
        count.current += 1;
        props.setDirections(res);
      } else {
        count.current = 0;
        console.log('res: ', res);
      }
    }
  };

  useEffect(() => {
    console.log('direction request changed');
    count.current = 0;
  }, [props.directionsRequest]);

  // Return JSX: map display
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        className='google-map'
        mapContainerStyle={containerStyle}
        center={atlanta}
        zoom={zoomLevel}
      >
        {props.directionsRequest && (
          <DirectionsService
            options={props.directionsRequest}
            callback={(e) => directionsCallback(e)}
          />
        )}
        <div id='panel' style={panelStyle}></div>

        {props.directions !== null && (
          <>
            <DirectionsRenderer
              directions={props.directions}
              //directions={transformDirections(directions)}
              panel={document.getElementById('panel')}
              // onLoad={(directionsRenderer) =>
              //   setDirectionsRenderer(directionsRenderer)
              // }
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
