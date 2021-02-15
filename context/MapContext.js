import { createContext, useState, useEffect } from 'react';
import querystring from 'querystring';

const MapContext = createContext();


export const MapProvider = (props) => {
	const [map, mapControls] = useState();



	/**
	*Input fetches address
	*/

	// const searchMapboxGeocoder = async(inp) => {
	// 	if(!inp) return false;
	// 	console.log(inp)
	// 	const geocoder_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inp}.json?types=poi,address,neighborhood&access_token=${process.env.MAPBOX_API_KEY}`
	// 	const get_locations = fetch(geocoder_url);
	// 	const res = await get_locations;
	// 	const locations = await res.json();
	// 	updateSearch(locations.features);
	// }
	// const throttledGeocoder = _.debounce(searchMapboxGeocoder, 400);
	/**
	*Sets user to null
	*
	*/
	

	/**
	*Retrieves the Magic Issues Bearer Token
	*This allows User to make authenticated requests
	*/
	

	// useEffect(()=> {
	// 	console.log(results)
	// }, [results])

// value={{ user, loginUser, logoutUser, getToken }}
	return (
		<MapContext.Provider value={{ mapControls, map }}>
			{props.children}
		</MapContext.Provider>
	)
}

export default MapContext;