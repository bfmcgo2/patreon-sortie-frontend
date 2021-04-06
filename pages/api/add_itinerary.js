import cookie from 'cookie';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {
	const { itin_name } = req.body;
	const cookies = cookie.parse(req.headers.cookie || '')

	const response = await fetch('http://localhost:1337/itineraries', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Authorization': `Bearer ${cookies.jwt}`
	  },
	  body: JSON.stringify({
	    name: itin_name,
	    users_permissions_user: 50249117
	  })
	})

	res.statusCode = 200;
	res.json({ itin_name });
}

