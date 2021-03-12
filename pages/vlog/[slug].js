import Auth from '../../components/Auth';

import { VlogProvider } from '../../context/VlogContext';

import dummy_data from '../../utils/dummy_data.json';
import dummy_itinerary from '../../utils/dummy_itinerary.json';
import { authCheck } from '../../utils/auth-check.js';

import VlogMapExperience from '../../components/VlogMapExperience';


const Vlog = ({data, itin, authenticated}) => {

	return (
		<div>
			{ authenticated ? 
				<VlogProvider>
					<VlogMapExperience data={data} itin = {itin}/>
				</VlogProvider>
				: <Auth />
			}

			
		</div>
	)
}

export async function getServerSideProps(ctx) {
	let authenticated = authCheck(ctx);
	console.log(authenticated);
	return {
		props: {
			authenticated,
			data: dummy_data,
			itin: dummy_itinerary
		}
	}

}

export default Vlog;