import { useState, useEffect } from 'react';

import styles from '../../styles/Input.module.css';

const Input = ({action}) => {
	const [input, updateInput] = useState('')

	useEffect(()=> {
		action(input)
	},[input]);
	
	return (
		<div className ={styles.input_container}>
			<input 
				className = {styles.input} 
				value = {input}
				onChange = {(val)=> updateInput(val.target.value)}
				type="text"/>
		</div>
		
	)
}

export default Input;