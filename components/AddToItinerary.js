import { useState, useEffect, useContext, useRef } from 'react';


import styles from '../styles/AddToItinerary.module.css';

import VlogContext from '../context/VlogContext';

import Button from './shared/Button';
import Card from './shared/Card';
import Input from './shared/Input';

const AddToItinerary = ({location, itin}) => {
	const { itin_pop, openItin }= useContext(VlogContext);

	const [dropdown, setDropdown] = useState(null);
	const [itin_type, setItinType] = useState();
	const [clear, setClear] = useState(false);

	const wrapperRef = useRef(null);
	  // below is the same as componentDidMount and componentDidUnmount
	useEffect(() => {
		document.addEventListener("click", handleClickOutside, false);
		return () => {
			document.removeEventListener("click", handleClickOutside, false);
		};
	}, []);

	const handleChange = (event)=>{

		setDropdown( event.target.value);
	}

	const handleClickOutside = event => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			reset()
		}
	};

	const reset = () => {
		setClear(true);
		openItin(false);
		setItinType(null);
		setDropdown(null);
	}

	const itinType =(type)=> {
		event.stopPropagation();
		setItinType(type)
	}

	const addToItinerary = () => {
		const findItin = itin.buckets.filter(bucket => bucket.value === dropdown);
		console.log(findItin)
		if(findItin.length === 0) return alert('Please select an itinerary')
		
		const locations = findItin[0].locations;
		const idCheck = locations.map((e)=>{ return e.id; }).indexOf(location.id);

		if(idCheck !== -1) {
			reset()
			return alert('Location exists in itinerary!')
		}
		
		findItin[0].locations.push(location);
		reset()
		alert('Location added!')
		
	}

	if(!itin_pop) return <div></div>
	return (
		<div className ={`${styles.addtoitinerary__container}`} ref={wrapperRef} >
			<Card>
				<p>{location.name}</p>


				{!itin_type && 
					<div styles={{display: 'flex', flexDirection:'row'}}>
						<Button action={()=> itinType('new')}>New Itinerary</Button>
						<Button action={()=> itinType('add')}>Add To An Itinerary</Button>
					</div>
					
				}
				{itin_type === 'add' &&
					<div>
						<label>Add to itinerary:</label>
						<select value={dropdown} onChange={handleChange} name="itin-bucket">
							<option disabled selected value={''}> -- select an option -- </option>
							{
								itin && itin.buckets.map((bucket, i)=>{
									return(
										<option key={i} value={bucket.value}>{bucket.name}</option>
									)
								})
							}
						</select>
					</div>
					
				}
				{itin_type === 'new' &&
					<Input 
						action ={()=> console.log('shit')} 
						locked={false} 
						active={false} 
						light={false} 
						label={'Create New Itinerary'}
						type={'text'}
						clear = {clear}/>
				}
				<Button action={()=> addToItinerary()}>Add To Itinerary</Button>
			</Card>
		</div>
		
	)
}

export default AddToItinerary;