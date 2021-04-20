import ReactPlayer from 'react-player';
import { useState, useContext } from 'react';
import { AspectRatio } from "@chakra-ui/react";

import VideoContext from '../../context/VideoContext';
import styles from '../../styles/Video.module.css';

const Video = ({url}) => {
	const { setVideoRef, setVideoTime, playing, setPlaying, setBuffered } = useContext(VideoContext);

	return (
		<AspectRatio ratio={16/9} minW="100%">
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
		          }}
		          onBuffer={(e)=> setBuffered(true)}/>
		    </div>	
		</AspectRatio>
	)
}

export default Video;