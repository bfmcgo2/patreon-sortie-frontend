import Head from 'next/head'
import cookie from 'cookie'; 
import { useRouter } from 'next/router'

import Auth from '../components/Auth';

import { authCheck } from '../utils/auth-check.js';

import styles from '../styles/Home.module.css'



export default function Home({authenticated}) {

  console.log(authenticated)

  return (

    <Auth />
      
  )


}

export async function getServerSideProps(ctx) {
  const authenticated = authCheck(ctx);

  return {
    props: {
      authenticated
    }
  }
}