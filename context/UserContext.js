import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();


export const UserProvider = (props) => {
	const [user, setUser] = useState(null);

	useEffect(()=> {
		console.log(user)
	},[user])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext;