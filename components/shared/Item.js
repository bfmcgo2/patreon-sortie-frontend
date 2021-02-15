import { useState, useEffect } from 'react';

import styles from '../../styles/Item.module.css';

const Item = (props) => {

	return (
		<div className ={styles.item__container} onClick = {props.action}>
			{props.children}
		</div>
		
	)
}

export default Item;