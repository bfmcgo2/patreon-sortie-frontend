import { useState, } from 'react';
import { 
		AspectRatio, 
		Box, 
		VStack, 
		StackDivider, 
		Text,  
		Button  } from "@chakra-ui/react"

import styles from '../styles/VlogContainer.module.css';

import Video from './shared/Video';
import GlobalContext from '../context/GlobalContext';

const VlogContainer = ({vlog, action, active_pin, add_action}) => {

	return (
		<div className ={`${styles.vlog__container}`} >
			
			<Box maxW="sm" minW="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
				<AspectRatio ratio={16/9} minW="100%">
					<Video url={vlog.url}/>
				</AspectRatio>
				<VStack
				  divider={<StackDivider borderColor="gray.100" />}
				  spacing={.1}
				  align="stretch"
				>
				{
					vlog.locations.map((loc,i) => {
						const order = {...loc, order: i}
						console.log(loc)
						return(
								<Box
						        	key={i} 
						        	h="40px" 
						        	className = {`${styles.vlog__locations} 
													${(active_pin && active_pin.order === i ? 
													styles.active : '')}`}
						        	display="flex" 
						        	alignItems="center" 
						        	justifyContent="center"
						        	flexDirection="row"
						        	onClick={()=> action(vlog.url, order)}>		
						        		<Text m="0 auto">{loc.name}</Text>	
						        		<a onClick={(e)=> {
											e.stopPropagation();
											add_action(true)
											}}>Add to Itinerary</a>	
						        </Box>	
						)
					})
				}

				</VStack>
			</Box>

			{
				// vlog.locations.map((loc,i) => {
				// 	const order = {...loc, order: i}
				// 	return <div key={i} 
				// 				className = {`${styles.vlog__locations} 
				// 								${(active_pin && active_pin.order === i ? 
				// 									styles.active : '')}`} 
				// 				onClick={()=> action(vlog.url, order)}>

				// 				<div className={styles.vlog__locations__button}>
				// 					<p>{loc.name}</p>
				// 					<a onClick={(e)=> {
				// 						e.stopPropagation();
				// 						add_action(true)
				// 						}}>Add to Itinerary</a>
				// 				</div>
				// 				{loc.additional_info &&
				// 					<div className={styles.vlog__locations__info}>
				// 						<span>User says:</span>
				// 						<p><i>{loc.additional_info}</i></p>
				// 					</div>
				// 				}
								
								
				// 			</div>
				// })
			}
		</div>
		
	)
}

export default VlogContainer;