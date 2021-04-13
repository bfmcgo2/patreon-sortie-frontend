import cookie from 'cookie';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {
	// const { itin_name } = req.body;
	const cookies = cookie.parse(req.headers.cookie || '')

	const {itin, loc} =req.body;
	console.log("ITINERARY: ", itin,"LOCATION: ", loc)
	const add_location = [loc, ...itin.locations];

	const response = await fetch(`${server}/itineraries/${itin.id}`, {
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

