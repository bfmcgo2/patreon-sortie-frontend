import { useState, useEffect } from 'react';

import styles from '../../styles/Button.module.css';

const Button = (props) => {

	return (
		<div className ={styles.button_container} onClick = {props.action}>
			<button className={styles.button}>
				{props.children}
			</button>
		</div>
		
	)
}

export default Button;