import cookie from 'cookie';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {
	const { url, locations } = req.body;
	const cookies = cookie.parse(req.headers.cookie || '')

	const response = await fetch(`${server}/vlogs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${cookies.jwt}`
		},
		body: JSON.stringify({
			url,
			locations
		})
	})

	res.statusCode = 200;
	res.json({ response });
}

