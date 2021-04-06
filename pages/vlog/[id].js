import Auth from '../../components/Auth';
import { useDisclosure  } from "@chakra-ui/react";
import getConfig from 'next/config';
import cookie from 'cookie';

import { VlogProvider } from '../../context/VlogContext';

import { authCheck } from '../../utils/auth-check.js';
import { userData } from '../../utils/user-data.js';

import VlogMapExperience from '../../components/VlogMapExperience';
import Header from '../../components/shared/Header';
import Drawer from '../../components/shared/Drawer';

const {publicRuntimeConfig} = getConfig();
const server = publicRuntimeConfig.SERVER_URL;


const Vlog = ({data, itin, authenticated, user}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
			{ authenticated && user ? 
				<>
					<Header itinOpen = {onOpen} user={user}/>
					<Drawer 
						isOpen ={isOpen}
						onOpen ={onOpen}
						onClose= {onClose}
						itin = { itin }/>
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

	if (!user_response) {
		user = null
	} else {
		user = user_response.user
	}

	const vlog_res = await fetch(`${server}/vlogs/?id=${id}`,{
		headers: {
			Authorization: `Bearer ${cookies.jwt}`
		}
	})

	const itin_res = await fetch(`${server}/itineraries`,{
		headers: {
			Authorization: `Bearer ${cookies.jwt}`
		}
	})

	const vlog_found = await vlog_res.json();
	const itin_found = await itin_res.json();

	return {
		props: {
			  // because the API response for filters is an array
			authenticated,
			data: vlog_found[0],
			itin: itin_found,
			user
		}
	}
}


export default Vlog;