import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css';

import { VideoProvider } from '../context/VideoContext';
import { MapProvider } from '../context/MapContext';
import { GlobalProvider } from '../context/GlobalContext';
import { UserProvider } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
  		<VideoProvider>
  			<MapProvider>
  				<GlobalProvider>
  					<ChakraProvider>
  						<Component {...pageProps} />
  					</ChakraProvider>
  				</GlobalProvider>
  			</MapProvider>
  		</VideoProvider>
    </UserProvider>
  )
}

export default MyApp
