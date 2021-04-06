import cookie from 'cookie';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {
	// const { itin_name } = req.body;
	const cookies = cookie.parse(req.headers.cookie || '')

	let {itin, loc} =req.body;


	console.log("CLONE: ", itin.itinerary.locations);

	let add_location = [loc, ...itin.itinerary.locations]
	console.log(add_location);

	const response = await fetch(`${server}/itineraries/${itin.itinerary.id}`, {
	  method: 'PUT',
	  headers: {
	    'Content-Type': 'application/json',
	    'Authorization': `Bearer ${cookies.jwt}`
	  },
	  body: JSON.stringify({
	    locations: add_location
	  })
	})

	res.statusCode = 200;
	res.json({ itin });
}

