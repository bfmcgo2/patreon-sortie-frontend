import { createContext, useState, useEffect, useContext } from 'react';
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

	const login = () =>{

		const getLoginURL = `${server}/connect/patreon`;
		// Show patreon auth popup
		const popup = window.open(getLoginURL, 'Patreon', 'height=600,width=400');
		window.patreonCallback = (user, access_token) => {
			// Sets user after authenticating then closes window
			
			popup.close()
			setAuth(user)
			fetch("/api/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					jwt: user.jwt,
					access_token:access_token,
				})
			}).then((data, i)=> {

				if(data.status === 200) {
					getUser();
					window.location.replace(window.location.href)
				}
				if(data.status === 401) {
					setError(true)
				}
			})

		}
	}

	const getUser = () => {
		fetch("/api/get_user")
		.then((data, i)=> {
			console.log("ERROR: ", data)
		  if(data.status === 200) {
		    console.log("SUCCESS: ", data);
		  }
		})
	}

	return (
		<UserContext.Provider value={{ auth, setAuth, logout, login }}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext;