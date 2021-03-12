import { useContext } from 'react';
import { useRouter } from 'next/router'
import { Button, Box, useColorModeValue as mode, Container, Text, Center  } from "@chakra-ui/react"
import { FaPatreon } from 'react-icons/fa';
import getConfig from 'next/config';

import UserContext from '../context/UserContext';

const Auth = (props) => {
	const { setUser, user } = useContext(UserContext);
	// get server url
	const { publicRuntimeConfig } = getConfig();
	const server = publicRuntimeConfig.SERVER_URL;

	const login = () =>{
		const getLoginURL = `${server}/connect/patreon`;
		// Show patreon auth popup
		const popup = window.open(getLoginURL, 'Patreon', 'height=600,width=400');
		window.patreonCallback = (user, access_token) => {
			// Sets user after authenticating then closes window
			
			popup.close()
			setUser(user)
			fetch("/api/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					jwt: user.jwt,
					access_token:access_token,
				})
			}).then(data=> {
				if(data.status === 200) {
					window.location.replace(window.location.href)
				}
			})

		}
	}
	return (
		<Container 
			maxW="100%" 
			padding="0" 
			height="100vh" 
			justifyContent='center' 
			centerContent 
			backgroundColor='tomato'>
			
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