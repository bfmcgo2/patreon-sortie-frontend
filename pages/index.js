import Head from 'next/head'

import Auth from '../components/Auth';

import { authCheck } from '../utils/auth-check.js';

export default function Home({authenticated}) {

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