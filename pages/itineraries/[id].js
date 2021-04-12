import cookie from 'cookie';
import { useEffect, useContext } from 'react';
import { useDisclosure  } from "@chakra-ui/react";
import getConfig from 'next/config';

import { authCheck } from '../../utils/auth-check.js';
import { userData } from '../../utils/user-data.js';

import Auth from '../../components/Auth';
import Header from '../../components/shared/Header';
import Drawer from '../../components/shared/Drawer';

import ItineraryMapExperience from '../../components/ItineraryMapExperience';

import UserContext from '../../context/UserContext';
import ItineraryContext from '../../context/ItineraryContext';

const {publicRuntimeConfig} = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

const Itinerary = ({authenticated, user, id}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { setUser } = useContext(UserContext);
	const { setActiveItin, getOneItinerary, active_itin } = useContext(ItineraryContext)
	useEffect(async()=> {
		if(user) {
			setUser(user);
			const itinerary = await getOneItinerary(id);
			setActiveItin(itinerary.itinerary);
		} 
	},[user])

	return (
		<div>
			{ authenticated && user ? 
				<>
					<Header itinOpen = {onOpen}/>
					<Drawer 
						isOpen ={isOpen}
						onOpen ={onOpen}
						onClose= {onClose}/>
					{
						<ItineraryMapExperience active_itin = { active_itin }/>
					}
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

	

	console.log(id)
	let user;

	if (!user_response) {
		user = null
	} else {
		user = {...user_response.user, jwt: cookies.jwt}
	}

	return {
		props: {
			  // because the API response for filters is an array
			authenticated,
			user,
			id
		}
	}
}

export default Itinerary;