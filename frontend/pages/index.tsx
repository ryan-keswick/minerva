import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NineResults from '@components/NineResults';
import { useStableDiffusion } from '@hooks/useStableDiffusion/useStableDiffusion';
import { initialPrompt } from '@constants/ai';
import SubmitPromptButton from '@components/SubmitPromptButton';
import React from 'react';

const Home: NextPage = () => {
  const [prompt, setPrompt] = React.useState(initialPrompt);
  const { data, isLoading, isError } = useStableDiffusion(prompt);

  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: { prompt: { value: string } };
  }) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    setPrompt(event.target.prompt.value.toLowerCase().replace(/\s/g, '-'));
  };

  if (!isLoading && (isError || data.message === 'fail')) {
    return <h1>Error =(</h1>;
  }

  return (
    <div className={styles.container}>
      <div>
        <Head>
          <title>Free Stable Diffusion</title>
          <meta name="description" content="Free Stable Diffusion" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Enter Prompt Below!</h1>
        <SubmitPromptButton handleSubmit={handleSubmit} />
      </div>
      {isLoading ? (
        <NineResults
          images={['0', '1', '2', '3', '4', '5', '6', '7', '8']}
          prompt={prompt}
          isLoading={isLoading}
        />
      ) : (
        <NineResults
          images={data.images}
          prompt={'placeholder'}
          isLoading={isLoading}
        />
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
