import { VlogProvider } from '../../context/VlogContext';

import dummy_data from '../../utils/dummy_data.json';

import VlogMapExperience from '../../components/VlogMapExperience';


const Vlog = ({data}) => {

	return (
		<VlogProvider>
			<VlogMapExperience data={data} />
		</VlogProvider>
		
	)
}

export async function getServerSideProps() {

return {
	props: {
		data: dummy_data
	}
}

}

export default Vlog;