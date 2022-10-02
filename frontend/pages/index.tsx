import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useStableDiffusion } from '@hooks/useStableDiffusion/useStableDiffusion';
import { initialPrompt } from '@constants/ai';
import SubmitPromptButton from '@components/SubmitPromptButton';
import React from 'react';
import ImageResult from '@components/NineResults/components/ImageResult';

import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const [prompt, setPrompt] = React.useState(initialPrompt);
  const { data, isLoading, isError } = useStableDiffusion(prompt);
  const { data: session } = useSession();

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
        {session ? (
          <>
            Signed in as {session.user.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
        <h1>Enter Prompt Below!</h1>
        <SubmitPromptButton handleSubmit={handleSubmit} />
      </div>
      <ImageResult
        image={data.images[0]}
        width={512}
        height={512}
        prompt={prompt}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  );
};

export default Home;

const Footer = () => {
  const twitterIcon = '/images/twitter.png';
  return (
    <div className={styles.footer}>
      <footer>
        <a href="https://twitter.com/RyanKeswick">
          <p>
            {'Follow Me on Twitter!  '}
            <Image
              src={twitterIcon}
              alt="Ryan Keswick's Twitter"
              width={18}
              height={15}
            />
          </p>
        </a>
      </footer>
    </div>
  );
};
