import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NineResults from '@components/NineResults';

const Home: NextPage = () => {
  const results = 'a-sketch-of-a-fox-with-a-rabbit-in-its-mouth';
  return (
    <div className={styles.container}>
      <div>
        <Head>
          <title>Free Stable Diffusion</title>
          <meta name="description" content="Free Stable Diffusion" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Enter Prompt Below!</h1>
      </div>
      <NineResults imageFolder={results} prompt={'placeholder'} />
    </div>
  );
};

export default Home;

function Footer() {
  const twitterIcon = '/images/twitter.png';
  return (
    <div className={styles.footer}>
      <footer>
        <p>Follow Me on Twitter! </p>
        <a href="https://twitter.com/RyanKeswick">
          <Image
            src={twitterIcon}
            alt="Ryan Keswick's Twitter"
            width={18}
            height={15}
          />
        </a>
      </footer>
    </div>
  );
}
