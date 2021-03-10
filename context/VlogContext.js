import { createContext, useState, useEffect, useContext } from 'react';
import querystring from 'querystring';

import {usePrevious} from '../utils/prev-hook.js';

import GlobalContext from './GlobalContext';

const VlogContext = createContext();

export const VlogProvider = (props) => {
	const { jumpToLocation, playing, map, video_time, jumpToTimestamp, setPlaying } = useContext(GlobalContext);

	const [active_pin, setActivePin] = useState(null);
	const [map_center, setMapCenter] = useState(null);
	const [itin_pop, openItinPop] = useState(false);

	const prevActivePin = usePrevious(active_pin);

	useEffect(()=> {
		if(active_pin) {
			if(!prevActivePin || prevActivePin.order !== active_pin.order) {
				jumpTo(active_pin)
			}
		}
		
	}, [active_pin])

	const jumpTo = (pin) => {
		jumpToLocation(pin.coordinates);
		jumpToTimestamp(pin.timestamp);
	}

	const clickLocation = (url,loc) => {
		let add_url = {...loc, url};
		console.log(add_url);
		setPlaying(false);
		setActivePin(add_url);
		setPlaying(true);
	}

	const openItin = (open) => {
		setPlaying(false);
		openItinPop(open);
		
	}

	return (
		<VlogContext.Provider value={{ itin_pop, active_pin,setActivePin, map, map_center, setMapCenter, clickLocation, video_time, openItin }}>
			{props.children}
		</VlogContext.Provider>
	)
}

export default VlogContext;