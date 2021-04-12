import { createContext, useState, useEffect } from 'react';
import _ from 'underscore';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

const UploadContext = createContext();


export const UploadProvider = (props) => {
	const [ data, updateData ] = 
	useState({
		url:'',
		locations:[]
	});
	// Upload State
	const [location, setLocation] = useState(null); //new location in vlog
	const [edit_location, editLocation] = useState(null);
	const [new_marker, createNewMarker] = useState([-118.5309, 34.3847]); //Adds marker on location click
	const [url, updateURL] = useState(''); //Youtube video URL
	const [results, updateSearch] = useState(); //Geocode results
	const [loading, setLoading] = useState(false);

	/**
	*Input fetches address
	*/
	const searchMapboxGeocoder = async(inp) => {
		if(!inp) {
			updateSearch(null)
			return false;
		};
		const geocoder_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inp}.json?types=poi,address,neighborhood&access_token=${process.env.MAPBOX_API_KEY}`
		const get_locations = fetch(geocoder_url);
		const res = await get_locations;
		const locations = await res.json();
		updateSearch(locations.features);
	}
	const throttledGeocoder = _.debounce(searchMapboxGeocoder, 400);

	// Add
	const addVlog = async (ev) => {
		console.log(CLIENT)
		ev.preventDefault();
		const response = await fetch(`${CLIENT}/api/vlog/add_vlog`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: data.url,
				locations: data.locations
			})
		})
		const json = await response.json();
		console.log(json)
	}	

	

	useEffect(()=> {
		console.log(JSON.stringify(data, null, 2));

	}, [data])

	useEffect(()=> {
		updateData({
			...data,
			url
		})
	}, [url])

// value={{ user, loginUser, logoutUser, getToken }}
	return (
		<UploadContext.Provider value={{ edit_location, editLocation, location, setLocation, new_marker, createNewMarker, url, updateURL, throttledGeocoder, results, addVlog, data, updateData }}>
			{props.children}
		</UploadContext.Provider>
	)
}

export default UploadContext;