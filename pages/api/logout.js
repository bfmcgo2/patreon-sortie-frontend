import cookie from 'cookie';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
	const cookie_format = (name, body) => {
		return cookie.serialize(name, body, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: new Date(0),
			sameSite: 'strict',
			path: '/'
		})
	}
	res.setHeader('Set-Cookie', [cookie_format('jwt', req.body.jwt), cookie_format('access_token', req.body.access_token)])
	res.statusCode = 200;
	res.json({ success: true });
}
