import Link from 'next/link';

import dummy_itinerary from '../../utils/dummy_itinerary.json';

const Itinerary = ({itinerary}) => {
	return (
		<div>
			{itinerary}
		</div>
	)
}


export async function getStaticPaths() {
	// Retrieve all the possible paths
	// const products_res = await fetch(`${API_URL}/products/`)
	// const products = await products_res.json()
	console.log(dummy_itinerary.buckets);

	const paths = dummy_itinerary.buckets.map(bucket => ({
		params: {slug: String(bucket.value)}
	}))
	console.log(paths, 'here babby')
	// Return them to NextJS context
	return {
		paths,
		fallback: false // Tells to next js to show a 404 if the param is not matching
	}
}

export async function getStaticProps({params}) {
	console.log(params, 'fuck')
	// const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
	// const found = await product_res.json();

	return {
		props: {
			product: 'hi' // because the API response for filters is an array
		}
	}
}

export default Itinerary;