import cookie from 'cookie';
import { getCurrentUser } from '../../lib/patreon';

export default async(req, res) => {
	const response = await getCurrentUser(req.query.access_token);
	const user = await response.json();

	const { email, full_name, image_url, url} = user.data.attributes

	res.statusCode = 200;
	res.json({ 
		user: {
			email,
			full_name,
			image_url,
			url
		} 
	});
}

