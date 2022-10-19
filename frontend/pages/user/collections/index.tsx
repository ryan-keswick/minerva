import { NextPage } from 'next';
import Topbar from '@/components/TopBar';
import { signIn, useSession } from 'next-auth/react';
import Footer from '@/components/Footer';
import { GetStaticProps } from 'next';
import { collection, image, PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { detokenisePrompt } from '@/functions/prompts';
import { useUserCollections } from '@/hooks/useUserCollections/userUserCollections';
import Head from 'next/head';

interface Props {
  collections: collection & { images: image[] }[];
}

export const UserCollections: NextPage = () => {
  const { data: session } = useSession();
  const { collections, isLoading, isError } = useUserCollections(
    session?.user?.id
  );

  console.log();
  return (
    <div>
      <Head>
        <title>Minerva - Your Collections</title>
        <meta
          name="description"
          content="Your collections that you have generated using Minerva"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Topbar session={session} />
      {session ? (
        <>
          {isLoading ? (
            <div className="flex justify-center">
              <h1 className="w-34 grid h-10 place-content-center">
                Loading...
              </h1>
            </div>
          ) : isError ? (
            <h1 className="flex justify-center">{'Error :('}</h1>
          ) : (
            collections && (
              <div>
                <div className="flex flex-row">
                  {collections.map((collection) => (
                    <div
                      key={collection.images[0].id}
                      className="flex-basis-64 p-1"
                    >
                      <Image
                        src={collection.images[0].image}
                        width={256}
                        height={256}
                        alt={detokenisePrompt(collection.images[0].prompt)}
                        key={collection.images[0].id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <h1 className="w-34 grid h-10 place-content-center">
            You Have to be signed in to use this feature!
          </h1>
          <button
            className="grid h-10 w-24 place-content-center rounded-full hover:bg-dark-blue hover:text-white"
            onClick={() => signIn('google')}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCollections;
