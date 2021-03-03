import { VlogProvider } from '../../context/VlogContext';

import dummy_data from '../../utils/dummy_data.json';
import dummy_itinerary from '../../utils/dummy_itinerary.json';

import VlogMapExperience from '../../components/VlogMapExperience';


const Vlog = ({data, itin}) => {

	return (
		<VlogProvider>
			<VlogMapExperience data={data} itin = {itin}/>
		</VlogProvider>
		
	)
}

export async function getServerSideProps() {

return {
	props: {
		data: dummy_data,
		itin: dummy_itinerary
	}
}

}

export default Vlog;