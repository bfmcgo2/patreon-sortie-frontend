import { useState, useContext, useEffect} from 'react';
import {  
		Box, 
		VStack, 
		StackDivider, 
		Text,  
		Button  } from "@chakra-ui/react"

import styles from '../styles/VlogContainer.module.css';

import Video from './shared/Video';
import ItineraryContext from '../context/ItineraryContext';

const VlogContainer = ({ active_itin }) => {
	const { active_location, setActiveLocation } = useContext(ItineraryContext);

	return (
		<div className ={`${styles.vlog__container}`} >
			
			<Box maxW="sm" minW="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
				<Video url={active_location.url}/>
				<Box
					height= {active_itin.locations.length > 6 ? "250px" : 'auto'}
				    overflow= "scroll">
					<VStack
					  divider={<StackDivider borderColor="gray.100" />}
					  spacing={.1}
					  align="stretch"
					>
					{ 
						active_itin.locations.map((loc,i) => {
							const order = {...loc, order: i}
							return(
									<Box
							        	key={i}
							        	id= {`vlog_${i}`}
							        	h="40px" 
							        	className = {`${styles.vlog__locations} 
														${(active_location && active_location.name === loc.name ? 
														styles.active : '')}`}
							        	display="flex" 
							        	alignItems="center" 
							        	justifyContent="center"
							        	flexDirection="row"
							        	onClick={()=> setActiveLocation(loc)}>		
							        		<Text m="0 auto">{loc.name}</Text>	
							        </Box>	
							)
						})
					}				
					</VStack>
				</Box>
			</Box>
		</div>
		
	)
}

export default VlogContainer;