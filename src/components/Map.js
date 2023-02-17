import React, { useState } from 'react'
import './Map.css'
import GoogleMapReact from 'google-map-react'

/** Component: Google Interactive Map
 * This is the interactive map that will display route query results */


const Map = () => {
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY
  

  // The location for the center of the map
  const atlanta = {
    lat: 33.747366971178586,
    lng: -84.38854681301125,
    address: 'atlanta ga',
  }
  // The zoom level of the map
  const zoomLevel = 12

  // Return JSX: map display, location pins commented out
  return (
    <div className='map'>
      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={atlanta}
          defaultZoom={zoomLevel}
        >
          {/* <LocationPin
            lat={atlanta.lat}
            lng={atlanta.lng}
            text={atlanta.address}
          /> */}
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Map
