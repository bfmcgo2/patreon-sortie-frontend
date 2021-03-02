import Slider from "react-slick";

import { fmtMSS } from '../../utils/format';
import styles from '../../styles/Slider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({ slides, action }) => {
	let total = slides.length;
	
	return(
		<div className={styles.slider_container}>
			{
				slides.map((slide, i)=>(
					<div className={styles.slider} onClick={()=> action(slide)}>
						<div className={styles.slider__content}>
							<h2>{slide.name}</h2>
							<span>{fmtMSS(slide.timestamp)}</span>
						</div>
						
					</div>
				))
			}
		</div>
	)
}

export default SliderComponent