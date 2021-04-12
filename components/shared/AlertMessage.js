import { useState, useEffect } from 'react';

import { Button, Container,Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { FaPatreon } from 'react-icons/fa';

const AlertMessage = (props) => {

	return (
		<Container
			position="fixed"
			maxW="100%"
			height="100%"
			alignItems="center"
			justifyContent="center"
			display="flex"
			zIndex="999"
			backgroundColor="rgba(46, 49, 49, .7)">
			<Alert
				status="warning"
				variant="subtle"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
				padding="35px"
				width= "400px"
			>
				<AlertIcon boxSize="40px" mr={0} />
				<AlertTitle mt={4} mb={1} fontSize="lg">
					{ props.title }
				</AlertTitle>

				<AlertDescription>{props.children}</AlertDescription>
				{ props.button && 
					<Button 
					  colorScheme="gray" 
					  leftIcon={<FaPatreon color={"rgb(255,66,77)"}/>}
					  _hover={{ bg: "rgb(225, 240, 250)" }} 
					  _focus={{
					      boxShadow:
					        "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
					    }}
					  onClick={ props.action }>
					    { props.button }
					  </Button>
				}
				
			</Alert>
		</Container>
		
	)
}

export default AlertMessage;