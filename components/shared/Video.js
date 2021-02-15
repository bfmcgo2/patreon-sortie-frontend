import styles from '../../styles/Video.module.css';

const Video = (props) => {
	
	return (
		<div className='player-container'>
	        <ReactPlayer
	          className='player'
	          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
	          width='100%'
	          height='100%'/>
	    </div>	
	)
}

export default Video;