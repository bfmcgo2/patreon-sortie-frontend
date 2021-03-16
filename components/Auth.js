import { useContext, useState } from 'react';
import { Button, Box, useColorModeValue as mode, Container, Text  } from "@chakra-ui/react"
import { FaPatreon } from 'react-icons/fa';
import getConfig from 'next/config';

import AlertMessage from './shared/AlertMessage';

import UserContext from '../context/UserContext';

const Auth = (props) => {
	const { login } = useContext(UserContext);
	// get server url
	const [error, setError] = useState(false);
	const { publicRuntimeConfig } = getConfig();
	const server = publicRuntimeConfig.SERVER_URL;

	

	const alertResponse = () => {
		window.open(
		  'https://www.patreon.com/sortie/',
		  '_blank' // <- This is what makes it open in a new window.
		);
		setError(false);
	}

	return (
		<Container 
			maxW="100%" 
			padding="0" 
			height="100vh" 
			justifyContent='center' 
			centerContent 
			backgroundColor='tomato'>

			{error &&
				<AlertMessage 
					title = "Please Sign Up for this Patreon!"
					button = "Join Sortie on Patreon!" 
					action = {alertResponse}/>
				
			}
			
			<Box
				bg={mode('white', 'gray.700')}
				py="4"
				px={{ base: '4', md: '10' }}
				shadow="base"
				rounded={{ sm: 'lg' }}
				maxW="sm"
			>

		    <Box p="6">
		      <Box d="flex" alignItems="baseline" flexDirection="column">
		        <Text fontSize="5xl">Sortie</Text>      
		        <Box
		          color="gray.500"
		          fontWeight="semibold"
		          letterSpacing="wide"
		          fontSize="xs"
		          textTransform="uppercase"
		          ml="2"
		          py="4"
		        >
		          Build an Itinerary from your favorite YouTubers
		        </Box>
		      </Box>
		      <Button 
		        colorScheme="gray" 
		        leftIcon={<FaPatreon color={"rgb(255,66,77)"}/>}
		        _hover={{ bg: "rgb(225, 240, 250)" }} 
		        _focus={{
		            boxShadow:
		              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
		          }}
		        onClick={login}>
		          Sign In With Patreon
		        </Button>
		    </Box>
		  </Box>
		</Container>
	)
}

export default Auth;