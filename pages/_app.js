import '../styles/globals.css';
import { UploadProvider } from '../context/UploadContext';
import { MapProvider } from '../context/MapContext';

function MyApp({ Component, pageProps }) {
  return (
  		<MapProvider>
  			<Component {...pageProps} />
  		</MapProvider>
  		
  )
}

export default MyApp
