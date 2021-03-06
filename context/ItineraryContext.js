import { createContext, useState, useEffect, useContext } from 'react';
import querystring from 'querystring';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

import { setBbox } from '../utils/setBbox';

import GlobalContext from './GlobalContext';
import UserContext from './UserContext';
import MapContext from './MapContext';

const ItineraryContext = createContext();

export const ItineraryProvider = (props) => {
	const { jumpToLocation, playing, video_time, video_ref, jumpToTimestamp, setPlaying, buffered, setBuffered } = useContext(GlobalContext);
	const { user } = useContext(UserContext)
	const { setMapCenter, map_center, map} = useContext(MapContext);

	const [itin, setItin] = useState([]); //set initial itineraries
	const [itin_name, createItinName] = useState(''); //create itinerary bucket
	const [active_itin, setActiveItin] = useState(null); //set active itinerary
	const [active_location, setActiveLocation] = useState(null);//set active location within itinerary
	const [loading_pins, setLoading] = useState(true); // loading state equals true to open the page
	const [popup, setPopup] = useState(null);
	const [add_to_itin, setAddToItin] = useState(null);



	useEffect(()=> {
		if(user) {
			fetchItineraries();
		}
	},[user]);

	useEffect(()=>{
		if(active_location && video_ref) {
			locationTimestamp(active_location);
			
		}
	},[active_location, video_ref, buffered]);

	// useEffect(()=>{
	// 	const { bbox_arr, center_point } = setBbox(data)
	// 	setMapCenter({
	// 		center: center_point.geometry.coordinates,
	// 		zoom: [8]
	// 	});	
	// 	if(map) {
	// 		const all_coords = data.locations.map(loc =>  loc.coordinates);
	// 		let camera_bounds = map.cameraForBounds(bbox_arr, {
	// 			padding: 200,
	// 			offset: [200, 0]
	// 		});	
	// 		setMapCenter({
	// 			center: [camera_bounds.center.lng,camera_bounds.center.lat] ,
	// 			zoom: [camera_bounds.zoom]
	// 		});	
	// 	}
		
		
	// },[data, map]);

	useEffect(()=>{
		if(!active_itin) {
			return;
		}

		if(active_itin.locations.length < 1) {
			setMapCenter({
				center: [-99.00997436121042,39.322656708394106],
				zoom: [3]
			});
			setAddToItin(false);
		}

		if(active_itin.locations.length === 1) {
			setMapCenter({
				center: active_itin.locations[0].coordinates,
				zoom: [10]
			});
			setLoading(false);
		}

		if(active_itin.locations.length > 1){
			const { bbox_arr, center_point } = setBbox(active_itin)
			setMapCenter({
				center: center_point.geometry.coordinates,
				zoom: [5]
			});
			if(map){
				const all_coords = active_itin.locations.map(loc =>  loc.coordinates);
				console.log("HEY MAP: ", map)
				const camera_bounds = map.cameraForBounds(bbox_arr, {
					padding: 200,
					offset: [0, 0]
				});
				setMapCenter({
					center: [camera_bounds.center.lng,camera_bounds.center.lat] ,
					zoom: [camera_bounds.zoom]
				});	
			}
			
			setLoading(false);
		}

		
		
	},[active_itin, map]);

	// Jump to location and timestamp on click
	const locationTimestamp = (loc) => {
		setBuffered(false);
		jumpToLocation(loc.coordinates);
		setPlaying(true);
		jumpToTimestamp(loc.timestamp);
		
	}

	// Get all
	const fetchItineraries = async() => {
	  const res = await fetch(`${CLIENT}/api/itinerary/get_itineraries`,{
	    headers: {
	      Authorization: `Bearer ${user.jwt}`
	    }
	  });
	  const itineraries = await res.json();
	  setItin(itineraries)
	}

	// Add
	const addItin = async(itin_name) => {
	  const add_itin = await fetch(`${CLIENT}/api/itinerary/add_itinerary`, {
	    method: "post",
	    headers: {
	      "Content-Type": "application/json"
	    },
	    body: JSON.stringify({
	      itin_name
	    })
	  })
	  const res = await add_itin;
	  const add_res = await res.json();
	  fetchItineraries();
	}

	// Update
	const updateItinerary = async(loc, itin) => {
		const update_itin = await fetch(`${CLIENT}/api/itinerary/update_itinerary`, {
		  method: "POST",
		  headers: {
		    "Content-Type": "application/json"
		  },
		  body: JSON.stringify({
		    loc,
		    itin
		  })
		})
	}

	// Delete
	const deleteItinerary = async(id) => {
		const delete_itin = await fetch(`${CLIENT}/api/itinerary/delete_itinerary`, {
		  method: "POST",
		  headers: {
		    "Content-Type": "application/json"
		  },
		  body: JSON.stringify({
		    id
		  })
		})
		fetchItineraries();
	}

	// Get One Itinerary
	const getOneItinerary =async(id) => {
		const get_itin = await fetch(`${CLIENT}/api/itinerary/get_itinerary`, {
		  method: "POST",
		  headers: {
		    "Content-Type": "application/json"
		  },
		  body: JSON.stringify({
		    id
		  })
		})
		const itinerary = await get_itin.json();
		return itinerary
	}

	// Add location to itinerary
	const addToItinerary = async(dropdown, location, reset) => {
		// Find Itinerary
		const findItin = itin.filter(bucket => {
			return bucket.name === dropdown
		});	

		// Remove order from location
		const { id, name, coordinates, timestamp, url } = location;
		const reformat_loc = {
			id, 
			name, 
			coordinates, 
			timestamp, 
			url
		}

		// Must select itinerary err
		if(findItin.length === 0) return alert('Please select an itinerary')
		
		// Can't add same location (name) twice
		const locations = findItin[0].locations;
		const nameCheck = locations.map((e)=>{ return e.name; }).indexOf(location.name);

		if(nameCheck !== -1) {
			reset()
			return alert('Location exists in itinerary!')
		}

		// API call for specific itinerary
		const itinerary = await getOneItinerary(findItin[0].id);
		// Update itinerary and reset form
		updateItinerary(reformat_loc, itinerary.itinerary)
		reset()
		alert('Location added!')	
	}
	return (
		<ItineraryContext.Provider 
			value={{ 
				addItin, 
				fetchItineraries, 
				itin_name, 
				createItinName, 
				itin, 
				getOneItinerary,
				updateItinerary,
				active_itin,
				setActiveItin,
				addToItinerary,
				active_location,
				setActiveLocation,
				loading_pins,
				popup,
				setPopup,
				add_to_itin,
				setAddToItin,
				deleteItinerary
			}}>
			{props.children}
		</ItineraryContext.Provider>
	)
}

export default ItineraryContext;