import { useEffect } from 'react';
import querystring from 'querystring';

const Callback = ({tokens}) => {
	
	useEffect(()=> {
		  window.opener.patreonCallback(tokens);
	},[])
	return (
	<div>		
		It Worked!
	</div>
	)
}

export async function getServerSideProps({query: { code }}) {

	// const client_id = process.env.PATREON_CLIENT_ID;
	// const client_secret = process.env.PATREON_CLIENT_SECRET;
	// const redirect_uri ='http://localhost:1337/connect/patreon/callback';
	// const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

	// const getAccessToken = async(code) => {
	// 	return fetch('https://www.patreon.com/api/oauth2/token', {
	// 		method: 'POST',
	// 		headers: {
	// 			Authorization: `Basic ${basic}`,
	// 			'Content-Type': 'application/x-www-form-urlencoded'
	// 		},
	// 		body: querystring.stringify({
	// 			code,
	// 			grant_type:'authorization_code',
	// 			client_id,
	// 			client_secret,
	// 			redirect_uri
	// 		})
	// 	});
	// }

	// const res = await getAccessToken(code);
	// const tokens = await res.json();
	// console.log("TOKENS", tokens)

	// const get_data = fetch('https://www.patreon.com/api/oauth2/api/current_user', {
	// 	headers: {
	// 		Authorization: `Bearer ${tokens.access_token}`
	// 	}
	// })

	// const data = await get_data;
	// const current_user = await data.json();
	// console.log(current_user)
	// const user_data = {
	// 	username: current_user.data.id,
	// 	email: current_user.data.attributes.email
	// }

	// console.log("CURRENT USER", user_data)

	// const user_login = fetch('https://sortie-patreon.herokuapp.com/connect/patreon', {
	// 	method: 'POST',
	// 	body: querystring.stringify(user_data)
	// });
	// const login_res = await user_login;
	// const success = await login_res.json();
	
	return {
		props: {
			tokens:null
		}
	}
}

export default Callback
