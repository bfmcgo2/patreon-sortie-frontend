import cookie from 'cookie'; 

export const authCheck = (ctx) => {
	const cookies = cookie.parse(ctx.req.headers.cookie || '');
	let authenticated;
	console.log(cookies)
	if(cookies.jwt && cookies.access_token) {
	  authenticated = true
	} else {
	  authenticated = false
	}
	return authenticated;
}