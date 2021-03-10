import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Button from '../components/shared/Button';

export default function Home() {

  const login = () =>{
    const client_id = process.env.PATREON_CLIENT_ID;

    const getLoginURL = 'http://localhost:1337/connect/patreon';

      // Show patreon auth popup
    const popup = window.open(getLoginURL, 'Patreon', 'height=600,width=400');
    window.patreonCallback = () => {
      // popup.close()
    }
  }

  return (
    <div className={styles.container}>
      <Button action={login}>Log In To Patreon</Button>
    </div>
  )
}
