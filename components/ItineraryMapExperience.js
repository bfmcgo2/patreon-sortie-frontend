import { useState, useEffect, useContext } from 'react';
import { Layer, Feature, Marker } from "react-mapbox-gl";

import styles from '../styles/Vlog.module.css';

import { setBbox } from '../utils/setBbox';

import ItineraryContext from '../context/ItineraryContext';
import MapContext from '../context/MapContext';

import Map from './shared/Map';


import VlogContainer from './VlogContainer';
import AddToItinerary from './AddToItinerary';

const ItineraryMapExperience = () => {
	const { setMapCenter, map_center, map} = useContext(MapContext);
	const { active_itin } = useContext(ItineraryContext);
	const [ loading, setLoading ] = useState(true)

	useEffect(()=>{
		const arr_check = Array.isArray(active_itin.locations);

		if(!arr_check || active_itin.locations === undefined ) return false;

		if(arr_check && active_itin.locations.length === 1) {
			setMapCenter({
				center: active_itin.locations[0].coordinates,
				zoom: [10]
			});
		}

		if(arr_check && active_itin.locations.length > 1){
			const { bbox_arr, center_point } = setBbox(active_itin)
			
			if(map){
				map.fitBounds(bbox_arr, {
					padding: 200
				});
			}
			setMapCenter({
				center: center_point.geometry.coordinates,
				zoom: [10]
			});
			setLoading(false)
			console.log("ACTIVE: ",active_itin.locations)
		}
		
	},[active_itin]);



	// const removeActiveLocations = () => {
	// 	if(!active_pin) return data.locations;
	// 	let order = data.locations.map((loc, i) => {
	// 		return {...loc, order: i}
	// 	})
	// 	return order.filter(loc => loc.id !== active_pin.id);
	// }

	// let activePin = 'http://www.myiconfinder.com/uploads/iconsets/48-48-805acbe9bb30960ac19dded197fbf2e8.png'
	return (
		<div className={styles.container}>
			<Map
				center= {map_center ? map_center.center : null}
				zoom= {map_center ? map_center.zoom: null }>
					{
						// <VlogContainer 
						// 	vlog = {data} 
						// 	action={ clickLocation }
						// 	active_pin={ active_pin }
						// 	add_action = { openItin }/>
					}
					

					<Layer 
						type="symbol" 
						id="reg_marker" 
						layout={{ 'icon-image': 'harbor-15' }}>
					{ !loading &&
						active_itin.locations.map((loc,i)=> {
					  		return(
				  			    <Feature 
					  			    key = { i }
				  			    	coordinates={loc.coordinates}/>
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

			</Map>  
		</div>	
		
	)
}

export default ItineraryMapExperience;