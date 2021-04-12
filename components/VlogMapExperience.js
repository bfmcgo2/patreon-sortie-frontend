import { useState, useEffect, useContext } from 'react';
import { Layer, Feature, Marker } from "react-mapbox-gl";

import styles from '../styles/Vlog.module.css';

import { setBbox } from '../utils/setBbox';

import VlogContext from '../context/VlogContext';
import MapContext from '../context/MapContext';

import Map from './shared/Map';


import VlogContainer from './VlogContainer';
import AddToItinerary from './AddToItinerary';

const VlogMapExperience = ({data}) => {
	const { active_pin, setActivePin, map, clickLocation, video_time, openItin }= useContext(VlogContext);
	const { setMapCenter, map_center} = useContext(MapContext);

	useEffect(()=>{
		const { bbox_arr, center_point } = setBbox(data)
		setMapCenter({
			center: center_point.geometry.coordinates,
			zoom: [8]
		});	
		if(map) {
			
			

			const all_coords = data.locations.map(loc =>  loc.coordinates);

			const bounds = all_coords.reduce((bounds, coord) => {
				console.log('bounds: ', bounds, 'coords: ', coord)
			});


			
			let camera_bounds = map.cameraForBounds(bbox_arr, {
				padding: 200,
				offset: [200, 0]
			});

				
			
			setMapCenter({
				center: [camera_bounds.center.lng,camera_bounds.center.lat] ,
				zoom: [camera_bounds.zoom]
			});	
		}
		
		
	},[data, map]);

	useEffect(()=> {
		const timestamps = data.locations.map(loc => loc.timestamp);
		const tot_timestamps = timestamps.length
		data.locations.map((loc, i) => {
			const trigger_timestamp = video_time > loc.timestamp && video_time < timestamps[i+1];
			const last_timestamp = video_time > timestamps[tot_timestamps - 1]

			if( trigger_timestamp || last_timestamp) {
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

					<AddToItinerary location ={active_pin}/>

					<Layer 
						type="symbol" 
						id="reg_marker" 
						layout={{ 
							'icon-image': 'harbor-15',
							'icon-allow-overlap': true 
						}}>
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