import * as turf from '@turf/turf';

export const setBbox = (data) => {
	const coords = data.locations.map(loc=>loc.coordinates);
	console.log(coords)

	const line = turf.lineString(coords);
	const bbox = turf.bbox(line);
	const center_point = turf.center(line);
	const bbox_arr = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];

	return {
		center_point, 
		bbox_arr
	}
}