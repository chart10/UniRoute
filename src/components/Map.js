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
  const [directions, setDirections] = useState({});
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
  // pass api results into direcitonsResult

  let count = useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 2) {
      fetch('/get_route')
        .then((res) => res.json())
        .then((data) => setDirections(data))
        .then(() => (count.current += 1));
    } else {
      count.current = 0;
      console.log('res: ', res);
    }

    // if (res !== null && count.current < 2) {
    //   if (res.status === 'OK') {
    //     count.current += 1;
    //     setDirections(res);
    //   }
    // } else {
    //   count.current = 0;
    //   console.log('res: ', res);
    // }
  };

  // useEffect(() => {
  //   if (directionsRenderer !== null && directions !== null) {
  //     const panel = document.getElementById('panel');
  //     directionsRenderer.setPanel(panel);
  //     // console.log(directionsRenderer.panel);
  //   }
  // }, [directionsRenderer, directions]);

  useEffect(() => {
    fetch('/get_route')
      .then((res) => res.json())
      .then((data) => {
        setDirections(data);
        console.log(directions);
      });
  }, []);

  // const transformDirections = (directions) => {
  //   if (!directions || !directions.routes) {
  //     return directions;
  //   }
  //   for (let route of directions.routes) {
  //     const oldBounds = route.bounds;
  //     console.log(route);
  //     route.bounds = {
  //       east: oldBounds.northeast.lng,
  //       west: oldBounds.southwest.lng,
  //       north: oldBounds.northeast.lat,
  //       south: oldBounds.southwest.lat,
  //     };
  //   }
  //   let fixTravelMode = (obj) => {
  //     if (obj.travel_mode) {
  //       obj.travelMode = obj.travel_mode;
  //       delete obj.travel_mode;
  //     }
  //     for (let key in obj) {
  //       if (typeof obj[key] == 'object') {
  //         fixTravelMode(obj[key]);
  //       }
  //     }
  //   };
  //   fixTravelMode(directions);
  //   console.log(directions);
  //   return directions;
  // };

  //const directionsResult = DirectionsService
  // Return JSX: map display, location pins commented out
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        className='google-map'
        mapContainerStyle={containerStyle}
        center={atlanta}
        zoom={zoomLevel}
      >
        {/* <div id='panel' style={panelStyle}></div> */}
        {directions !== null && (
          <DirectionsRenderer
            directions={directions}
            // options={{ panel: '#panel' }}
            onLoad={(directionsRenderer) =>
              setDirectionsRenderer(directionsRenderer)
            }
          />
        )}
        {/* <DirectionsService
          options={{
            destination: 'Atlanta, GA',
            origin: 'decatur, GA',
            travelMode: 'TRANSIT',
          }}
          callback={(e) => directionsCallback(e)}
        /> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
