import { createContext, useState } from 'react';
import getConfig from 'next/config';

const UserContext = createContext();


export const UserProvider = (props) => {
	const [auth, setAuth] = useState(null);
	const [user, setUser] = useState(null);
	const { publicRuntimeConfig } = getConfig();
	const server = publicRuntimeConfig.SERVER_URL;


	const logout = () =>{
	    // Logout user
	    setAuth(null);
	    fetch("/api/logout", {
	      method: "post",
	      headers: {
	        "Content-Type": "application/json"
	      },
	      body: JSON.stringify({
	        jwt: '',
	        access_token:'',
	      })
	    }).then((data, i)=> {
	      if(data.status === 200) {
	        window.location.replace(window.location.href)
	      }
	    })
	}

	const login = async() =>{

		const getLoginURL = `${server}/connect/patreon`;
		// Show patreon auth popup
		const popup = window.open(getLoginURL, 'Patreon', 'height=600,width=400');
		window.patreonCallback = (user, access_token) => {
			// Sets user after authenticating then closes window	
			popup.close();
			setAuth(user);
			userLogin(user.jwt, access_token)
		}
	}

	const userLogin = async (jwt, access_token) => {
		const user_login = await fetch("/api/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				jwt,
				access_token,
			})
		})
		const response = await user_login;
		const user_res = await response.json();
		if(response.status === 200) {
			setUser(user_res);
			window.location.replace(window.location.href);
		}
		if(response.status === 401) {
			setError(true)
		}
		
	}

	return (
		<UserContext.Provider value={{ auth, setAuth, logout, login, user }}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext;