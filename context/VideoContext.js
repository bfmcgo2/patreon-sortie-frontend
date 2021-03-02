import { createContext, useState, useEffect, useContext } from 'react';

const VideoContext = createContext();


export const VideoProvider = (props) => {
	const [video_ref, setVideoRef] = useState();
	const [video_time, setVideoTime] = useState();
	const [playing, setPlaying] = useState(false);

	return (
		<VideoContext.Provider value={{ setVideoRef, video_ref, video_time, setVideoTime, setPlaying, playing }}>
			{props.children}
		</VideoContext.Provider>
	)
}

export default VideoContext;