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
import Input from './shared/Input';

import CustomSearch from './Itinerary/CustomSearch';


import ItineraryVlog from './ItineraryVlog';

const ItineraryMapExperience = ({ active_itin }) => {
	const { setMapCenter, map_center, map} = useContext(MapContext);
	const { setActiveLocation, active_location, loading_pins, popup, setPopup, add_to_itin, setAddToItin, updateItinerary } = useContext(ItineraryContext);
	const { new_marker, createNewMarker } = useContext(GeocoderContext);
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

	const addToItinPins = () => {
		console.log(new_marker)
		updateItinerary( new_marker, active_itin)
		toast.closeAll()
	}

	const addCustomPins = (loc) => {
		toast.closeAll()
		createNewMarker({
			name: loc.text,
			coordinates: loc.geometry.coordinates,
			type: "custom"
		})
	}

	const changeName = (inp) => {
		if(inp !== new_marker.name) {
			createNewMarker({
				...new_marker,
				name: inp
			})
		}
		
	}

	
	useEffect(()=> {
		if(new_marker) {

			toast({
				status: "success",
				duration: null,
				isClosable: true,
				render: () => (
					<Box color="white" borderRadius="5px" p={4} 
						bg="blue.500" alignItems="center" 
						justifyContent="center" display="flex" flexDirection="column">
						<Input 
							locked={true} 
							active={true} 
							light={true} 
							label={'Create custom pin (ie: Hotel, Airbnb, etc)'}
							set_value= {new_marker ? new_marker.name : ''}
							type={'text'}/>
						<Button colorScheme="white" 
								m={2} 
								variant="outline"
								onClick={()=> addToItinPins()}>
							Add Pin
						</Button>
					 </Box>
					)
			})
		}
	}, [new_marker])

	if(!active_itin) return <div></div>
	return (
		<div className={styles.container}>
			{ active_itin && 
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
								<Button m="2" onClick={()=>setAddToItin(true)}>Drop your own custom pins!</Button>
							</AlertMessage>: <div></div>

						}

						{ add_to_itin && active_itin.locations.length === 0 ? 
							<Box
								position="absolute"
								top="20%"
								width="30%"
								bg="rgb(236,234,238)">
								<CustomSearch
								 action={addCustomPins}/>
							</Box>
							: <div></div>
						}
						<Layer type="circle" id="active_marker" paint={{
						  'circle-color': "#0d98ba",
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
								'icon-image': 'vlog-pin',
								'icon-allow-overlap': true,
								'icon-size' : 2
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