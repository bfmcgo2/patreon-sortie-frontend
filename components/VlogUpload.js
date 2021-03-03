import { useEffect, useContext, useState } from 'react';
import { Layer, Feature } from "react-mapbox-gl";

import UploadContext from '../context/UploadContext';
import GlobalContext from '../context/GlobalContext';

import { fmtMSS } from '../utils/format';

import styles from '../styles/AddVlog.module.css';
import Input from './shared/Input';
import Map from './shared/Map';
import Item from './shared/Item';
import Loader from './shared/Loader';
import Video from './shared/Video';
import Card from './shared/Card';
import Button from './shared/Button';
import Slider from './shared/Slider';

const VlogUpload = () => {
	// Context data/actions
	const { edit_location, editLocation, location, setLocation, throttledGeocoder, results, uploadYouTube, data, updateData, url, updateURL, new_marker, createNewMarker } = useContext(UploadContext);
	const { jumpToLocation, video_time, setPlaying, playing } = useContext(GlobalContext);

	const [clear, clearInput] = useState(false);

	useEffect(()=> {
		if(location) {
			locationTimestamp(video_time)
		}
		
	}, [video_time])


	// Location Input Update
	const locationName = (inp) => {
		setLocation({
			...location,
			name: inp
		})
	}
	const additionalInfo = (inp) => {
		setLocation({
			...location,
			additional_info: inp
		})
	}
	
	const locationTimestamp = (val) => {
		setLocation({
			...location,
			timestamp: val
		})
	}

	const resetLocation = () => {
		clearInput(false);
		clearLocForm();
	}



	// Add Location to map
	const itemClick = (coord, loc) => {
		createNewMarker(coord);
		jumpToLocation(coord);
		setPlaying(false);
		setLocation({
			id: loc.id,
			name: loc.text,
			coordinates: coord,
			timestamp: video_time
		})
	}

	const handleAddToVlog = async() => {
		clearInput(true)
		let new_locations = [...data.locations];
		new_locations.push(location);
		updateData({
			...data,
			locations: new_locations
		})
		
		resetLocation();
	}

	const deleteLocation = () => {
		let remove_loc = data.locations.filter(loc => loc.id !== location.id);

		updateData({
			...data,
			locations: remove_loc
		})
		clearLocForm()
	}

	const updateLocation = () => {
		let update_loc = data.locations.map(loc => (loc.id === location.id) ? location : loc);
		let sort = update_loc.sort((a,b) => a.timestamp - b.timestamp);
		updateData({
			...data,
			locations: sort
		})
		clearLocForm()
	}

	const handleEditClick = (loc) => {
		setPlaying(false);
		jumpToLocation(loc.coordinates);
		setLocation(loc)
		editLocation(true);	

	}

	const clearLocForm = () => {
		editLocation(false);
		setLocation(null);
	}


	return (
		<div className={styles.VlogUpload}>
			<div className={styles.vlog__builder}>
				{!data.url ?  
					<div className={styles.add__vlog}>
					
						<form onSubmit={(ev)=> uploadYouTube(ev, url)}>	
							<Input 
								action={updateURL} 
								locked={false} 
								active={false} 
								light={true} 
								label={'Upload Vlog'}
								type={'text'}
								clear={clear}/>
						</form>
					</div>
				:	<Video url={data.url}/>
				}
				
				
				<div className={styles.location__search}>
					<div className={styles.input__container}>
						<Input 
							action ={throttledGeocoder} 
							locked={!data.url ? true : false} 
							active={false} 
							light={true} 
							label={'Add Location To Vlog'}
							type={'text'}
							clear={clear}/>
					</div>
					<div className={styles.location__search_results}>
						{results && 
							results.map((loc, i)=>{
								return (
									<Item key={i} action={()=> {
										itemClick(loc.geometry.coordinates, loc)
									}}>
										<div>
											<h2>{loc.text}</h2>
											<span>{loc.place_name}</span>
										</div>
										<div className={styles.add}>+</div>
									</Item>
								)	
							})
						}
					</div>	
				</div>
				
			</div>	
			<div className = {styles.vlog__map}>
				<Map>
					{ new_marker &&
						<Layer
							type="symbol"
						  	id = "queryPin"
							layout={{ 
								"icon-image": "harbor-15",
								"icon-size" : 1.3
							}} >
						    <Feature 
						      coordinates = { new_marker } /> 	
						</Layer>
					}
					{ location &&
						<div className={styles.vlog__map__addlocation}>
							<Card>
								<Input 
									action={locationName} 
									locked={false} 
									active={false} 
									light={false} 
									label={'Location Name'}
									type={'text'}
									set_value={location.name}
									clear = {clear} />

								<p>Timestamp: { edit_location ? fmtMSS(location.timestamp) : location.timestamp && fmtMSS(location.timestamp)}</p>
								<Input 
									action ={additionalInfo} 
									locked={false} 
									active={false} light={false} 
									label={'Additional Information'}
									type={'text'}
									set_value= {edit_location ? location.additional_info : null}
									clear={clear} />
									
								{!edit_location && 
									<Button action={handleAddToVlog}>Add To Vlog</Button>
								}
								
								{edit_location && 
									<div className={styles.edit__location}>
										<div className={styles.button__container}>
											<Button action={updateLocation}>Edit</Button>
										</div>
										<div className={styles.button__container}>
											<Button action={deleteLocation}>Delete</Button>
										</div>
										<div className={styles.button__container}>
											<Button action={clearLocForm}>Cancel</Button>
										</div>
										
									</div>

								}
								
								
							</Card>
							
						</div>
					}
					<div className={styles.vlog__map__slider}>
						{data.locations.length !== 0 && 
							<Slider slides = {data.locations} action={handleEditClick}/>
						}
					</div>
					
					
				</Map>
			</div>
		</div>
	)
}

export default VlogUpload