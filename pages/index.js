import Head from 'next/head'
import { useContext } from 'react';

import Auth from '../components/Auth';

import { authCheck } from '../utils/auth-check.js';

import UserContext from '../context/UserContext';

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