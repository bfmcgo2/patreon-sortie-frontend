import Head from 'next/head';
import { useContext, useState } from 'react';
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
			  className={styles.map}
			  onStyleLoad={(map)=> mapControls(map)}
			>
			 {props.children}
			</Map>
			
		</div>
	)
}

export default MapComponent