import { useEffect, useContext, useState } from 'react';
import { Layer, Feature } from "react-mapbox-gl";
import { Box, Button } from "@chakra-ui/react";

import UploadContext from '../../context/UploadContext';
import GlobalContext from '../../context/GlobalContext';
import MapContext from '../../context/MapContext';

import styles from '../../styles/AddVlog.module.css';
import Input from '../shared/Input';
import Map from '../shared/Map';
import Slider from '../shared/Slider';

import Upload from './Upload';
import LocationSearch from './LocationSearch';
import LocationForm from './LocationForm';

const VlogUpload = () => {
	// Context data/actions
	const { edit_location, editLocation, location, addVlog, data, new_marker } = useContext(UploadContext);
	const { jumpToLocation, video_time, setPlaying, playing } = useContext(GlobalContext);
	const { map_center} = useContext(MapContext);

	const [clear, clearInput] = useState(false);


	const handleEditClick = (loc) => {
		setPlaying(false);
		jumpToLocation(loc.coordinates);
		editLocation(loc)	
	}

	return (
		<Box
			display= 'flex'
			flexDirection= 'row'
			position="relative">
			<Button
				position="fixed"
				right="10px"
				top="10px"
				zIndex="2"
				color="green"
				onClick={addVlog}>SUBMIT</Button>
			<div className={styles.vlog__builder}>		
				<Upload 
					clear = { clear }/>
				<LocationSearch 
					clear= { clear }/>		
			</div>

			<div className = {styles.vlog__map}>
				<Map
					center= {map_center ? map_center.center : null}
					zoom= {map_center ? map_center.zoom: null }>
					{ new_marker &&
						<Layer
							type="symbol"
						  	id = "queryPin"
							layout={{ 
								"icon-image": "harbor-15",
								"icon-size" : 1.3
							}} >
						    <Feature 
						      coordinates = { new_marker } /> 	
						</Layer>
					}
					{ location &&
						<LocationForm 
							clearInput={ clearInput }
							location= { location }/>
					}
					{ edit_location &&
						<LocationForm 
							clearInput={ clearInput }
							edit_location= { edit_location }/>
					}
					<div className={styles.vlog__map__slider}>
						{data.locations && data.locations.length !== 0 && 
							<Slider slides = {data.locations} action={handleEditClick}/>
						}
					</div>
					
					
				</Map>
			</div>
		</Box>
	)
}

export default VlogUpload