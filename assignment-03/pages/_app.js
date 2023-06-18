'use strict'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr'


export default function App({ Component, pageProps }) {
  /**
   * todo: add bootstrap js library
   * 
   */
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])

  return <Layout><SWRConfig value={{ fetcher: (...args) => fetch?.(...args).then((res) => res.json()) }}><Component {...pageProps} /></SWRConfig></Layout>
}
