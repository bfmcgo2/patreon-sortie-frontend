import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css';

import { VideoProvider } from '../context/VideoContext';
import { MapProvider } from '../context/MapContext';
import { GlobalProvider } from '../context/GlobalContext';
import { UserProvider } from '../context/UserContext';
import { ItineraryProvider } from '../context/ItineraryContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
  		<VideoProvider>
  			<MapProvider>
  				<GlobalProvider>
            <ItineraryProvider>
    					<ChakraProvider>
    						<Component {...pageProps} />
    					</ChakraProvider>
            </ItineraryProvider>
  				</GlobalProvider>
  			</MapProvider>
  		</VideoProvider>
    </UserProvider>
  )
}

export default MyApp
