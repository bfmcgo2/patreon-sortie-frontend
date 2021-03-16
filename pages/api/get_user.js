import cookie from 'cookie';
import { getCurrentUser } from '../../lib/patreon';

export default async(req, res) => {
	console.log("REQ: ", "RES: ")
	const response = await getCurrentUser(req.body.access_token);
	const user = await response.json();
	console.log(user.data);


	res.statusCode = 200;
	res.json({ success: true });
}

