import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import styles from '../../styles/Map.module.css';
import MapContext from '../../context/MapContext';

const Map = ReactMapboxGl({
  accessToken:
    process.env.MAPBOX_API_KEY
});

const MapComponent = (props) => {
	const { mapControls } = useContext(MapContext);

	return(
		<div className={styles.map_container}>
			<Map
			  style="mapbox://styles/mapbox/streets-v9"
			  onClick={(e, i)=> console.log(i)}
			  className={styles.map}
			  center={props.center ? props.center : [-96.85905171135028,39.75522481252764]}
			  zoom = {props.zoom ? props.zoom : [5]}
			  onStyleLoad={map=> {
			  	mapControls(map)
			  }}
			  containerStyle={{
			      height: '100%',
			      width: '100%'
			    }}
			>
			 {props.children}
			</Map>
			
		</div>
	)
}

export default MapComponent