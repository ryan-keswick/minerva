import type { NextPage } from 'next';
import Head from 'next/head';
import { useStableDiffusion } from '@hooks/useStableDiffusion/useStableDiffusion';
import { initialPrompt } from '@constants/ai';
import SubmitPromptButton from '@components/SubmitPromptButton';
import React from 'react';
import ImageResult from '@components/NineResults/components/ImageResult';
import TopBar from '@components/TopBar';
import { useSession } from 'next-auth/react';
import Footer from '@components/Footer';

export const Home: NextPage = () => {
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

  console.log(session);

  return (
    <div>
      <div>
        <Head>
          <title>Free Stable Diffusion</title>
          <meta name="description" content="Free Stable Diffusion" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TopBar session={session} />
        <h1 className="m-4 flex justify-center text-2xl text-dark-blue">
          Enter Prompt Below!
        </h1>
        <SubmitPromptButton handleSubmit={handleSubmit} />
      </div>
      <br />
      <br />
      <div className="flex justify-center">
        <ImageResult
          image={data.images[0]}
          width={512}
          height={512}
          prompt={prompt}
          isLoading={isLoading}
        />
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};
