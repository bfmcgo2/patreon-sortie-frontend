import { useState, useEffect, useContext } from 'react';


import styles from '../styles/VlogContainer.module.css';

import Video from './shared/Video';
import GlobalContext from '../context/GlobalContext';

const VlogContainer = ({vlog, action, active_pin}) => {

	return (
		<div className ={`${styles.vlog__container}`} >
			<Video url={vlog.url}/>
			{
				vlog.locations.map((loc,i) => {
					const order = {...loc, order: i}
					return <div key={i} 
								className = {`${styles.vlog__locations} 
												${(active_pin && active_pin.order === i ? 
													styles.active : '')}`} 
								onClick={()=> action(order)}>

								<p>{loc.name}</p>

									<a onClick={()=> console.log('hey')}>Add to Itinerary</a>
								</div>
				})
			}
		</div>
		
	)
}

export default VlogContainer;