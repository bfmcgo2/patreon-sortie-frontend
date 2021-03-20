import { useState, useEffect } from 'react';
import { AspectRatio, Box } from "@chakra-ui/react";

import Input from './shared/Input';
import Video from './shared/Video';


const Upload = ({ url, updateURL, clear }) => {
	return (
		<Box >
			{!url ?  
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					height="40vh"
					backgroundColor="rgb(19,24,58)">

					<form onSubmit={(ev)=> console.log(oops)}>	
						<Input 
							action={updateURL} 
							locked={false} 
							active={false} 
							light={true} 
							label={'Paste YouTube URL here'}
							type={'text'}
							clear={clear}/>
					</form>
				</Box>
			:	
			<Video url={url}/>	
			}
		</Box>
	)
}

export default Upload;