import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Free Dalle</title>
        <meta name="description" content="Free Dalle Mini Images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Enter Prompt Below!</h1>
      <SubmitPrompt />

    <Footer />
    </div>
  )
}

export default Home

function SubmitPrompt() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = String(event.target.prompt.value);
    const data = {
      prompt: prompt,
      s3Key: `v1/${prompt.replace(/[\s+]/g, '-').toLowerCase()}.png`
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch('/api/sendPrompt', options);
    console.log(response);
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt</label>
        <input type="text" name="prompt" id="prompt" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function Footer() {
  return (
    <div className={styles.footer}>
      <footer>
        <a>Follow Me on Socials!</a>
      </footer>
    </div>
  )
}