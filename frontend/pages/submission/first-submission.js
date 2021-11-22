import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'

export default function FirstSubmission() {
  return (
    <>
      <Layout>
        <Head>
          <title>First Submission</title>
        </Head>
        <h1>First Submission</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    </>
  )
}
