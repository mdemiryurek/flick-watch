import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from 'next/head'
import styles from './_app.module.scss'
import './../styles/globals.scss'
import Header from '../components/Header/Header'
import Link from 'next/link'
import { Provider } from "next-auth/client"

function MyApp({Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <Head>
          <title>Flick Watch</title>
          <meta name="description" content="A GraphQL project for educational of purpose" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;700&display=swap" rel="stylesheet" />
        </Head>

        <div className={styles.container}>
          <Header></Header>

          <main className={styles.main}>
            <Component {...pageProps} />
          </main>

          <footer className={styles.footer}>
            Flick Watch - <Link href='/'>GitHub repository</Link>
          </footer>

        </div>
      </Provider>
    </ApolloProvider>
  )
}



export default MyApp
