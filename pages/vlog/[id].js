import { useState, useEffect } from 'react';
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

const {publicRuntimeConfig} = getConfig();
const server = publicRuntimeConfig.SERVER_URL;
const CLIENT = publicRuntimeConfig.CLIENT_URL;


const Vlog = ({data, authenticated, user}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [itin, setItin] = useState([]); //set initial itineraries
	const [loading, setLoading] = useState(true);



	const fetchItineraries = async() => {
	  const res = await fetch(`${CLIENT}/api/itinerary/get_itineraries`,{
	    headers: {
	      Authorization: `Bearer ${user.jwt}`
	    }
	  });
	  const itineraries = await res.json();
	  setItin(itineraries)
	  setLoading(false);
	}

	const addItin = async(itin_name) => {
	  const add_itin = await fetch(`${CLIENT}/api/itinerary/add_itinerary`, {
	    method: "post",
	    headers: {
	      "Content-Type": "application/json"
	    },
	    body: JSON.stringify({
	      itin_name
	    })
	  })
	  const res = await add_itin;
	  const add_res = await res.json();
	  fetchItineraries();
	}

	useEffect(()=> {
	  fetchItineraries();
	},[])
	console.log(itin)
	return (
		<div>
			{loading &&
				<p>loading..</p>
			}
			{ authenticated && user && itin && data ? 
				<>
					<Header itinOpen = {onOpen} user={user}/>
					<Drawer 
						isOpen ={isOpen}
						onOpen ={onOpen}
						onClose= {onClose}
						itin = { itin }
						user= { user } 
						addItin= { addItin }/>
				<VlogProvider>
					<VlogMapExperience data={data} itin = {itin}/>
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