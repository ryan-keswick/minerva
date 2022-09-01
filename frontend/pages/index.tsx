import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NineResults from '@components/NineResults';
import { useStableDiffusion } from '@hooks/useStableDiffusion/useStableDiffusion';
import { initialPrompt } from '@constants/ai';

const Home: NextPage = () => {
  const { data, isLoading, isError } = useStableDiffusion(initialPrompt);

  if (isError) return <h1>Error =(</h1>;

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
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <NineResults images={data.images} prompt={'placeholder'} />
      )}
      <Footer />
    </div>
  );
};

export default Home;

function Footer() {
  const twitterIcon = '/images/twitter.png';
  return (
    <div className={styles.footer}>
      <footer>
        <a href="https://twitter.com/RyanKeswick">
          <p>Follow Me on Twitter! </p>
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
