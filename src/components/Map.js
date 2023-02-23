import React, { useState, useEffect, useRef } from 'react';
import './Map.css';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
} from '@react-google-maps/api';
import { useOutletContext } from 'react-router-dom';

/** Component: Google Interactive Map
 * This is the interactive map that will display route query results */

const Map = (props) => {
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

  //const { setDirections } = useOutletContext();
  const [directions, setDirections] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '90vh',
  };

  const panelStyle = {
    height: '90vh',
    width: '30%',
    float: 'left',
    overflow: 'scroll',
  };

  // The location for the center of the map
  const atlanta = {
    lat: 33.747366971178586,
    lng: -84.38854681301125,
    address: 'atlanta ga',
  };
  // The zoom level of the map
  const zoomLevel = 12;

  /*  This function calls the backend /get_out and returns the directions as a json
      NOTE: This generates a route using the Flask backend
   */
  // useEffect(() => {
  //   fetch('/get_route').then((res) => {
  //     res.json().then((data) => {
  //       setDirections(data);
  //     });
  //   });
  // }, []);

  /*  This function alters the backend /get_route response into a format
      that is readable by the DirectionsRenderer in the Map
  */
  const transformDirections = (directions) => {
    // Make a deep copy of the directions, so we don't mutate the original
    var directionsCopy = JSON.parse(JSON.stringify(directions));

    if (!directionsCopy || !directionsCopy.routes) {
      return directionsCopy;
    }
    for (let route of directionsCopy.routes) {
      const oldBounds = route.bounds;
      console.log(route);
      route.bounds = {
        east: oldBounds.northeast.lng,
        west: oldBounds.southwest.lng,
        north: oldBounds.northeast.lat,
        south: oldBounds.southwest.lat,
      };
    }
    // Recursively rename travel_mode to travelMode
    let fixTravelMode = (obj) => {
      if (obj.travel_mode) {
        obj.travelMode = obj.travel_mode;
        delete obj.travel_mode;
      }
      for (let key in obj) {
        if (typeof obj[key] == 'object') {
          fixTravelMode(obj[key]);
        }
      }
    };
    fixTravelMode(directionsCopy);
    // Add request here
    // TODO: Make this not hardcoded
    directionsCopy.request = {
      destination: {
        query: 'Norcross',
      },
      origin: {
        query: 'Atlanta',
      },
      travelMode: 'TRANSIT',
    };

    return directionsCopy;
  };

  /*  This function allows the DirectionsService to make an API call to Google and 
      return a directionsResult object
      NOTE: This generates a route WITHOUT USING FLASK BACKEND
   */
  let count = useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 2) {
      if (res.status === 'OK') {
        count.current += 1;
        setDirections(res);
      } else {
        count.current = 0;
        console.log('res: ', res);
      }
    }
  };
  // Return JSX: map display
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        className='google-map'
        mapContainerStyle={containerStyle}
        center={atlanta}
        zoom={zoomLevel}
      >
        <DirectionsService
          options={{
            destination: 'Atlanta, GA',
            origin: 'Norcross, GA',
            travelMode: 'TRANSIT',
          }}
          callback={(e) => directionsCallback(e)}
        />
        {/* <div id='panel' style={panelStyle}></div> */}
        {directions !== null && (
          <DirectionsRenderer
            directions={directions}
            // directions={directionResult}
            // options={{ panel: '#panel' }}
            onLoad={(directionsRenderer) =>
              setDirectionsRenderer(directionsRenderer)
            }
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
