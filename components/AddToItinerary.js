import { useState, useEffect, useContext } from 'react';


import styles from '../styles/AddToItinerary.module.css';

import Button from './shared/Button';
import Card from './shared/Card';

const AddToItinerary = ({location}) => {

	return (
		<div className ={`${styles.addtoitinerary__container}`} >
			<Card>
				<p>{location.name}</p>
				<Button action={()=> console.log('fuck')}>Add To Itinerary</Button>
			</Card>
		</div>
		
	)
}

export default AddToItinerary;