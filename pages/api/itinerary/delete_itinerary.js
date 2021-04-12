import cookie from 'cookie';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {
	// const { itin_name } = req.body;
	const cookies = cookie.parse(req.headers.cookie || '')

	let {id} =req.body;

	const response = await fetch(`${server}/itineraries/${id}`, {
	  method: 'DELETE',
	  headers: {
	    'Content-Type': 'application/json',
	    'Authorization': `Bearer ${cookies.jwt}`
	  }
	})

	res.statusCode = 200;
	res.json({ response });
}

