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
import { useEffect, useState } from 'react';

interface Props {
  collections: collection & { images: image[] }[];
}

const Toggle = ({
  text,
  id,
  toggle,
}: {
  text: string;
  id: string;
  toggle: boolean;
}) => {
  const [active, setActive] = useState(toggle);
  useEffect(() => {
    fetch(`/api/user/collections/${id}`, {
      method: 'UPDATE',
      body: JSON.stringify({ active }),
    });
    console.log(active, id);
  }, [id, active]);
  return (
    <div className="p-2 px-4">
      <label
        htmlFor={id}
        className="relative grid cursor-pointer grid-cols-2 place-content-start"
      >
        <input
          type="checkbox"
          value=""
          id={id}
          className="peer sr-only"
          onChange={() => setActive(!active)}
          checked={active}
        />
        <span className="place-self-start text-sm">{text}</span>
        <div className="peer h-6 w-11 place-self-end rounded-full bg-blue after:absolute after:top-[2px] after:left-[182px] after:h-5 after:w-5 after:rounded-full after:border after:border-baby-blue after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-baby-blue"></div>
      </label>
    </div>
  );
};

export const UserCollections: NextPage = () => {
  const { data: session } = useSession();
  const { collections, isLoading, isError } = useUserCollections(
    session?.user?.id
  );
  return (
    <div>
      <Head>
        <title>Minerva - Your Collections</title>
        <meta
          name="description"
          content="Your collections that you have generated using Minerva"
        />
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
              <div className="grid w-screen">
                <div className="grid w-fit gap-1 justify-self-center sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-4 xl:grid-cols-5">
                  {collections.map((collection) => (
                    <div key={collection.images[0].id} className="">
                      <Image
                        className="rounded-md"
                        src={collection.images[0].url}
                        width={256}
                        height={256}
                        alt={detokenisePrompt(collection.images[0].prompt)}
                        key={collection.images[0].id}
                      />
                      <div className="w-64 rounded-md bg-dark-blue text-white">
                        <p className="p-2 px-4">
                          {detokenisePrompt(collection.name)}
                        </p>
                        <Toggle
                          text="Publish"
                          id={collection.id}
                          toggle={collection.published}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
          <div>{session}</div>
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
      <Footer />
    </div>
  );
};

export default UserCollections;
