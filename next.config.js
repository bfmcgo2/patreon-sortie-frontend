require('dotenv').config();

const env = process.env.NODE_ENV;

module.exports = {
	env: {
        MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
        PATREON_CLIENT_ID: process.env.PATREON_CLIENT_ID,
        PATREON_CLIENT_SECRET: process.env.PATREON_CLIENT_SECRET
	},
	publicRuntimeConfig: {   
	    SERVER_URL: (env === 'development' ? 'http://localhost:1337':'https://sortie-patreon.herokuapp.com'),
	    CLIENT_URL: 'http://localhost:3000'   
	}
};