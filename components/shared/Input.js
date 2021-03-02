import { useState, useEffect } from 'react';

import styles from '../../styles/Input.module.css';

const Input = ({ action, locked, label, light, type, children, set_value, clear }) => {
	const [input, updateInput] = useState(set_value ? set_value : '');
	const [active, setActive] = useState(false);
	const [error, setError] = useState('');


	useEffect(()=> {
		if(action) action(input);
	},[input]);
	
	const inputChange =(val)=> {
		updateInput(val)
		setError('')
	}

	useEffect(()=> {
		if(clear) {
			updateInput('');
		}
	}, [clear])


	useEffect(()=> {
		updateInput(set_value)
	}, [set_value])

	const fieldClassName = `${styles.field} ${
      (locked ? active : active || input) && styles.active
    } ${locked && !active && styles.locked}`;

	return (
		<div className ={fieldClassName}>
			{type ==='text' &&
				<input 
					className = {`${light ? styles.input_light : styles.input_dark} ${styles.textbox}`} 
					value = {input}
					placeholder={active ? '' : label}
					onChange = {(val)=> inputChange(val.target.value)}
					type={type}
					onFocus={() => !locked && setActive( true )}
					onBlur={() => !locked && setActive( false )}/>
			}

			<label htmlFor={1} className={error && styles.error}>
			  {error || label}
			</label>
		</div>
		
	)
}

export default Input;
