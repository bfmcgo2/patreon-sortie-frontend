import { useContext } from 'react';

import UploadContext from '../context/UploadContext';
import MapContext from '../context/MapContext';
import styles from '../styles/Vlog.module.css';
import Input from './shared/Input';
import Map from './shared/Map';
import Item from './shared/Item';
import Loader from './shared/Loader';

const VlogUpload = () => {

	const { throttledGeocoder, results, loading } = useContext(UploadContext);
	const { map } = useContext(MapContext);

	const selectLocation = (coords) => {
		map.jumpTo({
			center: coords
		})
	}
// https://www.youtube.com/watch?v=NpLrGs3QPG8
	return (
		<div className={styles.VlogUpload}>
			<div className={styles.vlog__builder}>
				<div className={styles.add__vlog}>
					
					<Input action={throttledGeocoder} />
				</div>
				<div className={styles.location__search}>
					<Input action ={throttledGeocoder}/>
					{results && 
						results.map((loc, i)=>{
							return (
								<Item key={i} action={()=> selectLocation(loc.geometry.coordinates)}>
									<div>
										<h2>{loc.text}</h2>
										<span>{loc.place_name}</span>
									</div>
								</Item>
							)	
						})
					}
				</div>
				
			</div>
			
			<div className = {styles.vlog__map}>
				<Map>

				</Map>
			</div>
		</div>
	)
}

export default VlogUpload