import { createContext, useState, useEffect, useContext } from 'react';

const MapContext = createContext();


export const MapProvider = (props) => {
	const [map, mapControls] = useState();


	return (
		<MapContext.Provider value={{ mapControls, map }}>
			{props.children}
		</MapContext.Provider>
	)
}

export default MapContext;