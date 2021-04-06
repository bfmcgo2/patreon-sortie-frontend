import { createContext, useState, useEffect, useContext } from 'react';

const MapContext = createContext();


export const MapProvider = (props) => {
	const [map, mapControls] = useState();
	const [map_center, setMapCenter] = useState(null);


	return (
		<MapContext.Provider value={{ mapControls, map, setMapCenter, map_center }}>
			{props.children}
		</MapContext.Provider>
	)
}

export default MapContext;