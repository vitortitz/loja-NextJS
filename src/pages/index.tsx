import Head from 'next/head'
import { Layout } from "components"

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div >
          <Layout />
        </div>
      </main>
    </>
  )

}

export default Home;
