import cookie from 'cookie';

export default (req, res) => {

	const cookie_format = (name, body) => {
		return cookie.serialize(name, body, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: 'strict',
			path: '/'
		})
	}

	res.setHeader('Set-Cookie', [cookie_format('jwt', req.body.jwt), cookie_format('access_token', req.body.access_token)])
	res.statusCode = 200;
	res.json({ success: true });
}

