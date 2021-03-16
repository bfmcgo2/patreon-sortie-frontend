import Auth from '../../components/Auth';
import { useDisclosure  } from "@chakra-ui/react";

import { VlogProvider } from '../../context/VlogContext';

import dummy_data from '../../utils/dummy_data.json';
import dummy_itinerary from '../../utils/dummy_itinerary.json';
import { authCheck } from '../../utils/auth-check.js';

import VlogMapExperience from '../../components/VlogMapExperience';
import Header from '../../components/shared/Header';
import Drawer from '../../components/shared/Drawer';


const Vlog = ({data, itin, authenticated}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
			{ authenticated ? 
				<>
					<Header itinOpen = {onOpen}/>
					<Drawer 
						isOpen ={isOpen}
						onOpen ={onOpen}
						onClose= {onClose}/>
				<VlogProvider>
					<VlogMapExperience data={data} itin = {itin}/>
				</VlogProvider>
				</>
				: <Auth />
			}

			
		</div>
	)
}

export async function getServerSideProps(ctx) {
	let authenticated = authCheck(ctx);
	
	return {
		props: {
			authenticated,
			data: dummy_data,
			itin: dummy_itinerary
		}
	}

}

export default Vlog;