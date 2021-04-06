import { useContext, useEffect } from 'react';
import { AspectRatio, Box } from "@chakra-ui/react";

import styles from '../../styles/AddVlog.module.css';

import Input from '../shared/Input';
import Card from '../shared/Card';
import Button from '../shared/Button';

import UploadContext from '../../context/UploadContext';
import MapContext from '../../context/MapContext';
import GlobalContext from '../../context/GlobalContext';

import { fmtMSS } from '../../utils/format';

const LocationForm = ({ clear, clearInput, location, edit_location }) => {
	const { updateData, data, editLocation, setLocation } = useContext(UploadContext);
	const { jumpToLocation, setPlaying, video_time } = useContext(GlobalContext);
	const { setMapCenter} = useContext(MapContext);
	
	useEffect(()=> {
		if(edit_location) {
			editTimestamp(video_time)
		}
	}, [video_time])


	// Location Details
	const locationName = (inp) => {
		if(location) {
			setLocation({
				...location,
				name: inp
			})
		}
		
		if(edit_location) {
			editLocation({
				...edit_location,
				name: inp	
			})
		}
	}

	const editTimestamp = (val) => {
		if(edit_location) {
			editLocation({
				...edit_location,
				timestamp: val	
			})
		}
	}


	// Resetting Locations
	const clearLocForm = () => {
		editLocation(null);
		setLocation(null);
	}
	const resetLocation = () => {
		clearInput(false);
		clearLocForm();
	}

	// Edit locations

	const updateLocation = () => {
		let update_loc = data.locations.map(loc => (loc.id === edit_location.id) ? edit_location : loc);
		let sort = update_loc.sort((a,b) => a.timestamp - b.timestamp);
		updateData({
			...data,
			locations: sort
		})
		clearLocForm()
	}

	const deleteLocation = () => {
		let remove_loc = data.locations.filter(loc => loc.id !== edit_location.id);

		updateData({
			...data,
			locations: remove_loc
		})
		clearLocForm()
	}

	// Submitting
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

	return (
		<div className={styles.vlog__map__addlocation}>
			<Card>
				<Input 
					action={locationName} 
					locked={false} 
					active={false} 
					light={false} 
					label={'Location Name'}
					type={'text'}
					set_value={edit_location ? edit_location.name : location.name }
					clear = {clear} />

				<p>Timestamp: { edit_location ? fmtMSS(edit_location.timestamp) : location.timestamp && fmtMSS(location.timestamp)}</p>
					
				{ location && 
					<Button action={handleAddToVlog}>Add To Vlog</Button>
				}
				
				{ edit_location && 
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
				
		
	)
}

export default LocationForm;