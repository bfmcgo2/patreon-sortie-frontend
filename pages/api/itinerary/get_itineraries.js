import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

export default async(req, res) => {

	const response = await fetch(`${server}/itineraries`,{
		headers: {
			Authorization: req.headers.authorization
		}
	})
	console.log(response)
	const itineraries = await response.json();
	console.log("response: ", response.status, ">>>>>>>>");
	
	if(response.status > 200) {
		res.json({error: response.statusText});		
	}

	res.json( itineraries );
}

