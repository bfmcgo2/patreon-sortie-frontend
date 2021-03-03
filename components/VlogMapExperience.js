import { useState, useEffect, useContext } from 'react';
import * as turf from '@turf/turf';
import { Layer, Feature, Marker } from "react-mapbox-gl";

import styles from '../styles/Vlog.module.css';


import VlogContext from '../context/VlogContext';

import Map from './shared/Map';


import VlogContainer from './VlogContainer';
import AddToItinerary from './AddToItinerary';

const VlogMapExperience = ({data, itin}) => {
	const { active_pin, setActivePin, map, setMapCenter, map_center, clickLocation, video_time, openItin }= useContext(VlogContext);	

	useEffect(()=>{
		const coords = data.locations.map(loc=>loc.coordinates);
		const line = turf.lineString(coords);
		const bbox = turf.bbox(line);
		const center_point = turf.center(line);
		const bbox_arr = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];
		
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
				let order = {...loc, order: i}
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


	let regPin = 'http://www.myiconfinder.com/uploads/iconsets/48-48-8055c322ae4049897caa15e5331940f2.png';
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
					<Layer type="symbol" id="marker" layout={{ 'icon-image': 'harbor-15' }}>
					{ removeActiveLocations().map((loc,i)=> {
					  		return(
					  			    <Feature 
						  			    key = { i }
					  			    	coordinates={loc.coordinates}
					  			    	onClick={()=> clickLocation(loc)}/>
					  		)
					  	})
					}
				  	</Layer>
					{ active_pin &&
						<Marker 
							coordinates={active_pin.coordinates}
							style={{cursor: "pointer"}} 
							onClick={()=> clickLocation(active_pin)}>
							<img src={activePin}/>
						</Marker>
					}

			</Map>  
		</div>	
		
	)
}

export default VlogMapExperience;