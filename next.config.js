require('dotenv').config();

module.exports = {
    env: {
        MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
        PATREON_CLIENT_ID: process.env.PATREON_CLIENT_ID,
        PATREON_CLIENT_SECRET: process.env.PATREON_CLIENT_SECRET
  },
};