import { createContext, useState, useEffect } from 'react';
import _ from 'underscore';

const UploadContext = createContext();


export const UploadProvider = (props) => {
	const [data, updateData] = 
	useState({
		url:'',
		locations:[]
	});
	// Upload State
	const [location, setLocation] = useState(); //new location in vlog
	const [edit_location, editLocation] = useState(false);
	const [new_marker, createNewMarker] = useState([-118.5309, 34.3847]); //Adds marker on location click
	const [url, updateURL] = useState(''); //Youtube video URL
	const [results, updateSearch] = useState();
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


	/**
	*Input sets YouTube url for React Player
	*
	*/
	const uploadYouTube = (ev,inp) => {
		ev.preventDefault();
		const add_url = {...data, url: inp};
		updateData(add_url);
	}	

	

	useEffect(()=> {
		console.log(JSON.stringify(data, null, 2));

	}, [data])

// value={{ user, loginUser, logoutUser, getToken }}
	return (
		<UploadContext.Provider value={{ edit_location, editLocation, location, setLocation, new_marker, createNewMarker, url, updateURL, throttledGeocoder, results, uploadYouTube, data, updateData }}>
			{props.children}
		</UploadContext.Provider>
	)
}

export default UploadContext;