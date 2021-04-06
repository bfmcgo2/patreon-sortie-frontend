import { useContext, useEffect } from 'react';
import { AspectRatio, Box } from "@chakra-ui/react";

import Input from '../shared/Input';
import Video from '../shared/Video';
import Item from '../shared/Item';

import UploadContext from '../../context/UploadContext';
import MapContext from '../../context/MapContext';
import GlobalContext from '../../context/GlobalContext';


const LocationSearch = ({ clear }) => {
	const { results, throttledGeocoder, url, createNewMarker, setLocation, location } = useContext(UploadContext);
	const { jumpToLocation, setPlaying, video_time } = useContext(GlobalContext);
	const { setMapCenter} = useContext(MapContext);
	
	useEffect(()=> {
		if(location) {
			locationTimestamp(video_time)
		}
		
	}, [video_time])

	const locationTimestamp = (val) => {
		setLocation({
			...location,
			timestamp: val
		})
	}

	// Add Location to map
	const itemClick = (coord, loc) => {
		createNewMarker(coord);
		setMapCenter({
			center: coord,
			zoom: [15]
		});
		jumpToLocation(coord);
		setPlaying(false);
		setLocation({
			id: Date.now(),
			name: loc.text,
			coordinates: coord,
			timestamp: video_time
		})
	}

	return (
		<Box
			marginTop="10px">
			<Box
				padding="0 10px">
				<Input 
					action ={throttledGeocoder} 
					locked={!url ? true : false} 
					active={false} 
					light={true} 
					label={'Add Location To Vlog'}
					type={'text'}
					clear={clear}/>
			</Box>
			<Box
				overflowY= "scroll"
				height= "50vh">
				{results && 
					results.map((loc, i)=>{
						return (
							<Item key={i} action={()=> {
								itemClick(loc.geometry.coordinates, loc)
							}}>
								<div>
									<h2>{loc.text}</h2>
									<span>{loc.place_name}</span>
								</div>
								<Box alignSelf="center">+</Box>
							</Item>
						)	
					})
				}
			</Box>
		</Box>
				
		
	)
}

export default LocationSearch;