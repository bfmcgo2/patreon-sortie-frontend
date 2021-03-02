import { useState, useEffect } from 'react';

import styles from '../../styles/Card.module.css';

const Card = (props) => {

	return (
		<div className ={styles.card__container} onClick = {props.action}>
			{props.children}
		</div>
		
	)
}

export default Card;