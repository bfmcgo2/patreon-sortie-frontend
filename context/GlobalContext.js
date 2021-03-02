import { createContext, useState, useEffect, useContext } from 'react';

import VideoContext from './VideoContext';
import MapContext from './MapContext';

import { roundTime, fmtMSS } from '../utils/format';

const GlobalContext = createContext();


export const GlobalProvider = (props) => {
	const { video_time, video_ref, setPlaying, playing } = useContext(VideoContext);
	const { map } = useContext(MapContext);

	/**
	*Jumps to location in Map
	*/
	const jumpToLocation = (coords, offset) => {
		map.jumpTo({
			center: [coords[0],coords[1]],
			zoom: [15]
		});
	};

	const jumpToTimestamp = (time) => {
		video_ref.seekTo(time);
	};


	return (
		<GlobalContext.Provider value={{ map, jumpToLocation, jumpToTimestamp, video_time, video_ref, setPlaying, playing }}>
			{props.children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext;