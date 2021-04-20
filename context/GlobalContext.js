import { createContext, useState, useEffect, useContext } from 'react';

import VideoContext from './VideoContext';
import MapContext from './MapContext';
import UserContext from './UserContext';

import { roundTime, fmtMSS } from '../utils/format';

const GlobalContext = createContext();


export const GlobalProvider = (props) => {
	const { video_time, video_ref, setPlaying, playing, buffered, setBuffered } = useContext(VideoContext);
	const { map } = useContext(MapContext);
	const { user, setUser } = useContext(UserContext);

	/**
	*Jumps to location in Map
	*/
	const jumpToLocation = (coords, offset) => {
		map.jumpTo({
			center: coords,
			zoom: [15]
		});
	};

	const jumpToTimestamp = (time) => {
		video_ref.seekTo(time);
	};


	return (
		<GlobalContext.Provider value={{ map, jumpToLocation, jumpToTimestamp, video_time, video_ref, setPlaying, playing, buffered, setBuffered }}>
			{props.children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext;