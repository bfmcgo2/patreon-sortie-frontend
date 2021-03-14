import querystring from 'querystring';

// const USER_DATA = `https://api.spotify.com/v1/me`;

// const dev = process.env.NODE_ENV === "production";



export const getCurrentUser= async(access_token) => {
  const res = fetch('https://www.patreon.com/api/oauth2/api/current_user?fields%5Bpledge%5D=amount_cents,declined_since,created_at,pledge_cap_cents,patron_pays_fees,total_historical_amount_cents', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  const user = await res
  return user;
} 



