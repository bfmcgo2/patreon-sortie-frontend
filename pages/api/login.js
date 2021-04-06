import cookie from 'cookie';
import { getCurrentUser } from '../../lib/patreon';

export default async(req, res) => {
	const response = await getCurrentUser(req.body.access_token);
	const user = await response.json();
	console.log(user.data.relationships.pledges.data)

	if(user.data.relationships.pledges.data.length === 0 ) {
		console.log('denied: ', res)
		return res.status(401).json({ error: 'Unauthorized' })
	}

	const cookie_format = (name, body) => {
		return cookie.serialize(name, body, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 360 * 60,
			sameSite: 'strict',
			path: '/'
		})
	}
	const { email, full_name, image_url, url} = user.data.attributes

	res.setHeader('Set-Cookie', [cookie_format('jwt', req.body.jwt), cookie_format('access_token', req.body.access_token)])
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

