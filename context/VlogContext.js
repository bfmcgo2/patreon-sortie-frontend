import { createContext, useState, useEffect, useContext } from 'react';
import querystring from 'querystring';

import {usePrevious} from '../utils/prev-hook.js';

import GlobalContext from './GlobalContext';

const VlogContext = createContext();

export const VlogProvider = (props) => {
	const { jumpToLocation, playing, map, video_time, jumpToTimestamp, setPlaying } = useContext(GlobalContext);

	const [active_pin, setActivePin] = useState(null);
	const [map_center, setMapCenter] = useState(null);

	const prevActivePin = usePrevious(active_pin);

	useEffect(()=> {
		if(active_pin) {
			if(!prevActivePin || prevActivePin.id !== active_pin.id) {
				jumpTo(active_pin)
			}
		}
		
	}, [active_pin])

	const jumpTo = (pin) => {
		jumpToLocation(pin.coordinates);
		jumpToTimestamp(pin.timestamp);
	}

	const clickLocation = (loc) => {
		setPlaying(false);
		setActivePin(loc);
		setPlaying(true);
	}

	return (
		<VlogContext.Provider value={{ active_pin,setActivePin, map, map_center, setMapCenter, clickLocation, video_time }}>
			{props.children}
		</VlogContext.Provider>
	)
}

export default VlogContext;