import { useState, useEffect, useContext } from 'react';
import { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import { useToast, Button, Box } from "@chakra-ui/react"

import AlertMessage from './shared/AlertMessage'

import styles from '../styles/Vlog.module.css';

import { setBbox } from '../utils/setBbox';

import ItineraryContext from '../context/ItineraryContext';
import MapContext from '../context/MapContext';
import GeocoderContext from '../context/GeocoderContext';

import Map from './shared/Map';

import CustomSearch from './Itinerary/CustomSearch';


import ItineraryVlog from './ItineraryVlog';

const ItineraryMapExperience = ({ active_itin }) => {
	const { setMapCenter, map_center, map} = useContext(MapContext);
	const { setActiveLocation, active_location, loading_pins, popup, setPopup, add_to_itin, setAddToItin } = useContext(ItineraryContext);
	const { new_marker } = useContext(GeocoderContext);
	const toast = useToast();

	const locationHover = (loc) => {
		map.getCanvas().style.cursor = 'pointer';
		toast({
          title: loc.name,
          position: 'bottom',
          status: "info",
          isClosable: false
        })
	}
	const locationOffHover = () => {
		map.getCanvas().style.cursor = 'grab';
		toast.closeAll()
	}


	const addCustomPins = () => {
		setAddToItin(true);

	}
	console.log(active_itin, add_to_itin)


	if(!active_itin) return <div></div>
	return (
		<div className={styles.container}>
			{active_itin && 
				<Map
					center= {map_center ? map_center.center : null}
					zoom= {map_center ? map_center.zoom: null }>
						{
							active_location ? <ItineraryVlog active_itin={ active_itin } /> : <div></div>
						}	

						{ !add_to_itin && active_itin.locations.length === 0 ? 
							<AlertMessage 
								title = "You have no itinerary locations"
								button="Discover New Locations"
								action={()=> window.open('https://www.patreon.com/sortie/', '_blank')}>
								<Button m="2" onClick={addCustomPins}>Drop your own custom pins!</Button>
							</AlertMessage>: <div></div>

						}

						{ add_to_itin && active_itin.locations.length === 0 ? 
							<Box
								position="absolute"
								top="20%"
								width="30%"
								bg="rgb(236,234,238)">
								<CustomSearch />
							</Box>
							: <div></div>
						}
						<Layer type="circle" id="active_marker" paint={{
						  'circle-color': "#ff5200",
						  'circle-stroke-width': 1,
						  'circle-stroke-color': '#fff',
						  'circle-stroke-opacity': 1
						 }}>
						{ new_marker && 
							
				   			    <Feature 
				   			    	coordinates={new_marker.coordinates}
				   			    	
				   			    	onMouseEnter={()=> {
				   			    		map.getCanvas().style.cursor = 'pointer';
				   			    	}}
				   			    	onMouseLeave={()=> {
				   			    		map.getCanvas().style.cursor = 'grab';
				   			    	}}/>
							
						}
						</Layer>

						<Layer 
							type="symbol" 
							id="reg_marker" 
							layout={{ 
								'icon-image': 'harbor-15',
								'icon-allow-overlap': true
							 }}>
						{ !loading_pins &&
							active_itin.locations.map((loc,i)=> {
						  		return(
					  			    <Feature 
						  			    key = { i }
					  			    	coordinates={loc.coordinates}
					  			    	onClick={()=> {
					  			    		setActiveLocation(loc);
					  			    	}}
					  			    	onMouseEnter={()=> {
					  			    		locationHover(loc);
					  			    	}}
					  			    	onMouseLeave={()=> {
					  			    		locationOffHover();
					  			    	}}/>
						  		)
						  	})
						}
					  	</Layer>
						{ popup &&
							<Popup
							  coordinates={popup.coordinates}
							  offset={{
							    'bottom-left': [12, -10],  'bottom': [0, -10], 'bottom-right': [-12, -10]
							  }}>
							  <h1>{popup.name}</h1>
							</Popup>
						}

				</Map>  
			}
			
		</div>	
		
	)
}

export default ItineraryMapExperience;