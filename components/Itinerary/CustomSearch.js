import { useContext } from 'react';
import { Box } from "@chakra-ui/react";

import Input from '../shared/Input';
import Item from '../shared/Item';

import GeocoderContext from '../../context/GeocoderContext';
import MapContext from '../../context/MapContext';
import GlobalContext from '../../context/GlobalContext';


const CustomSearch = ({ action }) => {
	const { results, throttledGeocoder, createNewMarker, } = useContext(GeocoderContext);
	const { jumpToLocation, setPlaying, video_time } = useContext(GlobalContext);
	const { setMapCenter} = useContext(MapContext);

	// Add Location to map
	const itemClick = (coord, loc) => {
		console.log(coord, loc)
		createNewMarker({
			name: loc.text,
			coordinates: coord
		});
		setMapCenter({
			center: coord,
			zoom: [15]
		});
		jumpToLocation(coord);
		action(loc);
	}

	return (
		<Box
			marginTop="10px">
			<Box
				padding="0 10px">
				<Input 
					action ={throttledGeocoder} 
					locked={false} 
					active={false} 
					light={false} 
					label={'Add To Itinerary'}
					type={'text'}/>
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

export default CustomSearch;