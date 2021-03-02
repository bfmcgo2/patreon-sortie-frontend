import ReactPlayer from 'react-player';
import { useState, useContext } from 'react';

import VideoContext from '../../context/VideoContext';
import styles from '../../styles/Video.module.css';

const Video = ({url}) => {
	const { setVideoRef, setVideoTime, playing, setPlaying } = useContext(VideoContext);

	return (
		<div className={styles.player_container}>
	        <ReactPlayer
	          className={styles.react_player}
	          url={url}
	          ref = {(ref)=> setVideoRef(ref)}
	          width='100%'
	          height='100%'
	          playing={ playing }
	          controls = {true}
	          onPlay={()=> setPlaying(true)}
	          onPause={()=> setPlaying(false)}
	          onProgress={(e)=> {
	          	setVideoTime(e.playedSeconds)
	          }}/>
	    </div>	
	)
}

export default Video;