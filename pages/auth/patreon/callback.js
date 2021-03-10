import { useEffect, useState } from 'react';
import querystring from 'querystring';

const Callback = ({tokens, url}) => {
	const [auth, setAuth] = useState();

	useEffect(async()=> {
		window.opener.patreonCallback(tokens);
		if(!location) {
			console.log('fuck you: ', location)
			return
		}
		const { search } = location;
		const res = fetch(`http://localhost:1337${url}`);
		const user = await res;
		console.log(user);
		const user_data = await user.json();
		console.log(user_data)
	},[])
	return (
	<div>		
		It Worked!
	</div>
	)
}

export async function getServerSideProps(props) {
	console.log('START HERE', props);
	
	return {
		props: {
			tokens:null,
			url: props.resolvedUrl
		}
	}
}

export default Callback
