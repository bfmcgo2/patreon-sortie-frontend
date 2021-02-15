import { createContext, useState, useEffect } from 'react';
import querystring from 'querystring';
import _ from 'underscore';

const UploadContext = createContext();


export const UploadProvider = (props) => {
	const [data, updateData] = useState({});
	const [results, updateSearch] = useState();
	const [map, mapControls] = useState();
	const [loading, setLoading] = useState(false);


	/**
	*Input fetches address
	*/

	const searchMapboxGeocoder = async(inp) => {
		if(!inp) {
			updateSearch(null)
			return false;
		};
		console.log(inp)
		const geocoder_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inp}.json?types=poi,address,neighborhood&access_token=${process.env.MAPBOX_API_KEY}`
		const get_locations = fetch(geocoder_url);
		const res = await get_locations;
		const locations = await res.json();
		updateSearch(locations.features);
	}
	const throttledGeocoder = _.debounce(searchMapboxGeocoder, 400);
	/**
	*Sets user to null
	*
	*/
	

	/**
	*Retrieves the Magic Issues Bearer Token
	*This allows User to make authenticated requests
	*/
	

	useEffect(()=> {

	}, [results])

// value={{ user, loginUser, logoutUser, getToken }}
	return (
		<UploadContext.Provider value={{ throttledGeocoder, results, mapControls }}>
			{props.children}
		</UploadContext.Provider>
	)
}

export default UploadContext;