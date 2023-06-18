import React from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'

const Map = (props) => {

    console.log(props)
    /**
     * get all the property from the props, using destructuring.
     */
    const { 'start station location': startStationLocation, 'end station location': endStationLocation, 'start station name': startStationName, 'end station name': endStationName } = props


    
   

    return (

        /**
         * The map functionality using leaflet
         */

      <MapContainer style={{ "height": "500px" }} center={[startStationLocation.coordinates[1], startStationLocation.coordinates[0]]} zoom={15}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[startStationLocation.coordinates[1], startStationLocation.coordinates[0]]}>
                <Tooltip permanent direction='right'>Start: {startStationName}</Tooltip>
            </Marker>
            <Marker position={[endStationLocation.coordinates[1], endStationLocation.coordinates[0]]}>
                <Tooltip permanent direction='right'>End: {endStationName}</Tooltip>
            </Marker>
        </MapContainer>

    )
}

export default Map