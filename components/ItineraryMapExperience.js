import { useState, useEffect, useContext } from 'react';
import { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import { useToast } from "@chakra-ui/react"

import AlertMessage from './shared/AlertMessage'

import styles from '../styles/Vlog.module.css';

import { setBbox } from '../utils/setBbox';

import ItineraryContext from '../context/ItineraryContext';
import MapContext from '../context/MapContext';

import Map from './shared/Map';


import ItineraryVlog from './ItineraryVlog';

const ItineraryMapExperience = ({ active_itin }) => {
	const { setMapCenter, map_center, map} = useContext(MapContext);
	const { setActiveLocation, active_location, loading_pins, popup, setPopup } = useContext(ItineraryContext);

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

	console.log(active_location);

	return (
		<div className={styles.container}>
			{active_itin && 
				<Map
					center= {map_center ? map_center.center : null}
					zoom= {map_center ? map_center.zoom: null }>
						{
							active_location ? <ItineraryVlog active_itin={ active_itin } /> : <div></div>
						}		

						<Layer 
							type="symbol" 
							id="reg_marker" 
							layout={{ 'icon-image': 'harbor-15' }}>
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
					  	<Layer type="circle" id="active_marker" paint={{
					  	  'circle-color': "#ff5200",
					  	  'circle-stroke-width': 1,
					  	  'circle-stroke-color': '#fff',
					  	  'circle-stroke-opacity': 1
					  	 }}>
						{ 
							// active_pin &&
				  	// 		    <Feature 
				  	// 		    	coordinates={active_pin.coordinates}
				  	// 		    	onClick={()=> clickLocation(data.url, active_pin)}/>
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