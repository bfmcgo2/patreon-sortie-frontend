import { createContext, useState, useEffect } from 'react';
import _ from 'underscore';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

const GeocoderContext = createContext();


export const GeocoderProvider = (props) => {
	
	// Geocoder State

	const [new_marker, createNewMarker] = useState(null); //Adds marker on location click
	const [results, updateSearch] = useState(); //Geocode results
	console.log(new_marker)
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

	return (
		<GeocoderContext.Provider value={{ new_marker, createNewMarker, throttledGeocoder, results }}>
			{props.children}
		</GeocoderContext.Provider>
	)
}

export default GeocoderContext;