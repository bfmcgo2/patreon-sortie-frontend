// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
	res.setHeader('Set-Cookie', 
		cookie.serialize('jwt', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			expires: new Date(0),
			sameSite: 'strict',
			path: '/'
		})
	)
	res.setHeader('Set-Cookie', 
		cookie.serialize('access_token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: 'strict',
			path: '/'
		})
	)
	res.statusCode = 200;
	res.json({ success: true });
}
