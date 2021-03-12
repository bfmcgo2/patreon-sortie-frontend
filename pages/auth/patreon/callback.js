import { useEffect, useState, useContext } from 'react';
import querystring from 'querystring';
import getConfig from 'next/config';

import UserContext from '../../../context/UserContext';

const Callback = ({tokens, resolvedUrl, access_token}) => {
	const {publicRuntimeConfig} = getConfig();
	const server = publicRuntimeConfig.SERVER_URL;

	const { setUser } = useContext(UserContext);

	useEffect(async()=> {
		// ie server: http://localhost:1337/
		// resolvedURL: auth/patreon/callback?access_token=etc etc
		const res = fetch(`${server}${resolvedUrl}`);
		const user = await res;
		const user_data = await user.json();
		window.opener.patreonCallback(user_data, access_token);
	},[])
	return (
	<div>		

	</div>
	)
}

export async function getServerSideProps(props) {
	return {
		props: {
			tokens:null,
			resolvedUrl: props.resolvedUrl,
			access_token: props.query.access_token
		}
	}
}

export default Callback
