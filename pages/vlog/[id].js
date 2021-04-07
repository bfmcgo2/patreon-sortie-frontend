import { useState, useEffect, useContext } from 'react';
import { useDisclosure  } from "@chakra-ui/react";
import getConfig from 'next/config';
import cookie from 'cookie';

import { VlogProvider } from '../../context/VlogContext';

import { authCheck } from '../../utils/auth-check.js';
import { userData } from '../../utils/user-data.js';

import Auth from '../../components/Auth';
import VlogMapExperience from '../../components/VlogMapExperience';
import Header from '../../components/shared/Header';
import Drawer from '../../components/shared/Drawer';

import UserContext from '../../context/UserContext';

const {publicRuntimeConfig} = getConfig();
const server = publicRuntimeConfig.SERVER_URL;
const CLIENT = publicRuntimeConfig.CLIENT_URL;


const Vlog = ({data, authenticated, user}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(true);
	const { setUser } = useContext(UserContext); 

	useEffect(()=> {
		if(user) {
			setUser(user)
		} 
	},[user])

	return (
		<div>
			{ authenticated && user && data ? 
				<>
					<Header itinOpen = {onOpen}/>
					<Drawer 
						isOpen ={isOpen}
						onOpen ={onOpen}
						onClose= {onClose}/>
				<VlogProvider>
					<VlogMapExperience data={data}/>
				</VlogProvider>
				</>
				: <Auth />
			}
		</div>
	)
}

export async function getServerSideProps(ctx, d) {
	const { id } = ctx.params
	const cookies = cookie.parse(ctx.req.headers.cookie || '');
	const authenticated = authCheck(ctx);
	const user_response = await userData(ctx);

	let user;
	let vlog;

	const vlog_res = await fetch(`${server}/vlogs/?id=${id}`,{
		headers: {
			Authorization: `Bearer ${cookies.jwt}`
		}
	})

	const vlog_found = await vlog_res.json();

	if (!user_response || vlog_res.status > 200) {
		user = null
		vlog = null
	} else {
		user = {...user_response.user, jwt: cookies.jwt}
		vlog = vlog_found[0];
	}

	return {
		props: {
			  // because the API response for filters is an array
			authenticated,
			data: vlog,
			user
		}
	}
}


export default Vlog;