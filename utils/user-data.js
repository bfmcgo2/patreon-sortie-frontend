import cookie from 'cookie'; 
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const client = publicRuntimeConfig.CLIENT_URL;

export const userData = async(ctx) => {
	const cookies = cookie.parse(ctx.req.headers.cookie || '');
	let user_data;
	console.log(cookies)
	const {access_token, jwt} = cookies;
	if(jwt && access_token) {
	  const get_user = await fetch(`${client}/api/get_user?access_token=${access_token}`);
	  user_data = await get_user.json()
	} else {
		user_data = null
	}
	return user_data;
}