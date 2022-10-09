import { NextPage } from 'next';
import Image from 'next/image';

export const Footer: NextPage = () => {
  const twitterIcon = '/images/twitter.png';
  return (
    <footer>
      <a
        href="https://twitter.com/RyanKeswick"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex justify-center">
          <p className="px-2">Follow Me on Twitter!</p>
          <span className="align-text-bottom">
            <Image
              src={twitterIcon}
              alt="Ryan Keswick's Twitter"
              width={18}
              height={18}
            />
          </span>
        </div>
      </a>
    </footer>
  );
};
