import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div>
        <Head>
          <title>Free Dalle</title>
          <meta name="description" content="Free Dalle Mini Images" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Enter Prompt Below!</h1>
        <SubmitPrompt />
      </div>
      <Result />
      <div className={styles.container}>
        <Footer />
      </div>
    </div>
  );
};

function Result() {
  let images: { url: string }[] = [];
  let prompt: string;
  const noPromptYet = () => {
    return true;
  };

  if (noPromptYet()) {
    prompt = "Sketch of a fox with a rabbit in its mouth";
    images = [
      { url: "/images/fox0.png" },
      { url: "/images/fox1.png" },
      { url: "/images/fox2.png" },
      { url: "/images/fox3.png" },
      { url: "/images/fox4.png" },
      { url: "/images/fox5.png" },
      { url: "/images/fox6.png" },
      { url: "/images/fox7.png" },
      { url: "/images/fox8.png" },
    ];
  }

  return (
    <div className={styles.result}>
      <div className={styles.resultsRow}>
        <ImageResult image={images[0].url} prompt={prompt} />
        <ImageResult image={images[1].url} prompt={prompt} />
        <ImageResult image={images[2].url} prompt={prompt} />
      </div>
      <div className={styles.resultsRow}>
        <ImageResult image={images[3].url} prompt={prompt} />
        <ImageResult image={images[4].url} prompt={prompt} />
        <ImageResult image={images[5].url} prompt={prompt} />
      </div>
      <div className={styles.resultsRow}>
        <ImageResult image={images[6].url} prompt={prompt} />
        <ImageResult image={images[7].url} prompt={prompt} />
        <ImageResult image={images[8].url} prompt={prompt} />
      </div>
    </div>
  );
}

function ImageResult(props: { image: string; prompt: string }) {
  return (
    <div className={styles.result}>
      <Link href={props.image}>
        <Image src={props.image} alt={props.prompt} width={225} height={225} />
      </Link>
    </div>
  );
}

export default Home;

function SubmitPrompt() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const prompt = String(event.target.prompt.value);
    const data = {
      prompt: prompt,
      s3Key: `v1/${prompt.replace(/[\s+]/g, "-").toLowerCase()}.png`,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // const response = await fetch('/api/sendPrompt', options);
    // console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt </label>
        <input type="text" name="prompt" id="prompt" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function Footer() {
  const twitterIcon = "/images/twitter.png";
  return (
    <div className={styles.footer}>
      <footer>
        <a>Follow Me on Twitter! </a>
        <Link href="https://twitter.com/RyanKeswick">
          <Image
            src={twitterIcon}
            alt="Ryan Keswick's Twitter"
            width={18}
            height={15}
          />
        </Link>
      </footer>
    </div>
  );
}
