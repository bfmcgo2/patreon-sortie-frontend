import { useState, useEffect, useContext } from 'react';
import { Layer, Feature, Marker } from "react-mapbox-gl";

import styles from '../styles/Vlog.module.css';

import { setBbox } from '../utils/setBbox';

import VlogContext from '../context/VlogContext';

import Map from './shared/Map';


import VlogContainer from './VlogContainer';
import AddToItinerary from './AddToItinerary';

const VlogMapExperience = ({data, itin}) => {
	const { active_pin, setActivePin, map, setMapCenter, map_center, clickLocation, video_time, openItin }= useContext(VlogContext);	

	useEffect(()=>{
		const { bbox_arr, center_point } = setBbox(data)
		
		if(map){
			map.fitBounds(bbox_arr, {
				padding: 200
			});
		}
		setMapCenter({
			center: center_point.geometry.coordinates,
			zoom: [10]
		});
		
	},[data]);

	useEffect(()=> {
		const timestamps = data.locations.map(loc => loc.timestamp);
		data.locations.map((loc, i) => {
			if(video_time > loc.timestamp && video_time < timestamps[i+1]) {
				let order = {...loc, order: i, url: data.url}
				setActivePin(order);
			}
		})

		
		
	}, [video_time])

	const removeActiveLocations = () => {
		if(!active_pin) return data.locations;
		let order = data.locations.map((loc, i) => {
			return {...loc, order: i}
		})
		return order.filter(loc => loc.id !== active_pin.id);
	}

	let activePin = 'http://www.myiconfinder.com/uploads/iconsets/48-48-805acbe9bb30960ac19dded197fbf2e8.png'
	return (
		<div className={styles.container}>
			<Map
				center= {map_center ? map_center.center : null}
				zoom= {map_center ? map_center.zoom: null }>

					<VlogContainer 
						vlog = {data} 
						action={ clickLocation }
						active_pin={ active_pin }
						add_action = { openItin }/>

					<AddToItinerary location ={active_pin} itin={itin}/>

					<Layer 
						type="symbol" 
						id="reg_marker" 
						layout={{ 'icon-image': 'harbor-15' }}>
					{ removeActiveLocations().map((loc,i)=> {
					  		return(
				  			    <Feature 
					  			    key = { i }
				  			    	coordinates={loc.coordinates}
				  			    	onClick={()=> clickLocation(data.url,loc)}/>
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
					{ active_pin &&
		  			    <Feature 
		  			    	coordinates={active_pin.coordinates}
		  			    	onClick={()=> clickLocation(data.url, active_pin)}/>
					}
					</Layer>

			</Map>  
		</div>	
		
	)
}

export default VlogMapExperience;