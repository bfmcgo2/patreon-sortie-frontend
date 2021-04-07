import { createContext, useState, useEffect, useContext } from 'react';
import querystring from 'querystring';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

import GlobalContext from './GlobalContext';
import UserContext from './UserContext';

const ItineraryContext = createContext();

export const ItineraryProvider = (props) => {
	const { jumpToLocation, playing, video_time, jumpToTimestamp, setPlaying } = useContext(GlobalContext);
	const { user } = useContext(UserContext)

	const [itin, setItin] = useState([]); //set initial itineraries
	const [itin_name, createItinName] = useState(''); //create itinerary bucket
	const [active_itin, setActiveItin] = useState({}); //set active itinerary

	useEffect(()=> {
		if(user) {
			fetchItineraries();
		}
	},[user])
	console.log(itin)

	// useEffect(()=> {
	// 	if(active_itin) {
	// 		console.log(active_itin)
	// 	}
	// })

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
		const add_itin = await fetch(`${CLIENT}/api/itinerary/update_itinerary`, {
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
		updateItinerary(reformat_loc, itinerary)
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
				active_itin,
				setActiveItin,
				addToItinerary
			}}>
			{props.children}
		</ItineraryContext.Provider>
	)
}

export default ItineraryContext;