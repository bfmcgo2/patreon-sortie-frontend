import { useState, useEffect, useContext } from 'react';


import styles from '../styles/VlogContainer.module.css';

import Video from './shared/Video';
import GlobalContext from '../context/GlobalContext';

const VlogContainer = ({vlog, action, active_pin, add_action}) => {

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
								onClick={()=> action(vlog.url, order)}>

								<div className={styles.vlog__locations__button}>
									<p>{loc.name}</p>
									<a onClick={(e)=> {
										e.stopPropagation();
										add_action(true)
										}}>Add to Itinerary</a>
								</div>
								{loc.additional_info &&
									<div className={styles.vlog__locations__info}>
										<span>User says:</span>
										<p><i>{loc.additional_info}</i></p>
									</div>
								}
								
								
							</div>
				})
			}
		</div>
		
	)
}

export default VlogContainer;