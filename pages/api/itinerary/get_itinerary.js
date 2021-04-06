import cookie from 'cookie';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {
	const cookies = cookie.parse(req.headers.cookie || '')
	
	let {id} =req.body;
	const response = await fetch(`${server}/itineraries/${id}`, {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	    'Authorization': `Bearer ${cookies.jwt}`
	  }
	})
	const itinerary = await response.json();

	res.statusCode = 200;
	res.json({ itinerary });
}

