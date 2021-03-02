import '../styles/globals.css';
import { VideoProvider } from '../context/VideoContext';
import { MapProvider } from '../context/MapContext';
import { GlobalProvider } from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  return (
  		<VideoProvider>
  			<MapProvider>
  				<GlobalProvider>
  					<Component {...pageProps} />
  				</GlobalProvider>
  			</MapProvider>
  		</VideoProvider>
  )
}

export default MyApp
