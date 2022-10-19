import { NextPage } from 'next';
import Topbar from '@/components/TopBar';
import { useSession } from 'next-auth/react';
import Footer from '@/components/Footer';
import { GetStaticProps } from 'next';
import { PrismaClient, collection, image } from '@prisma/client';

interface Props {
  collections: collection & { images: image[] }[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const collections = await prisma.collection.findMany({
    where: {
      published: true,
      hidden: false,
    },
    include: {
      images: true,
    },
  });
  return {
    props: {
      collections: collections,
    },
    revalidate: 600,
  };
};

export const Community: NextPage<Props> = ({ collections }: Props) => {
  const { data: session } = useSession();
  return (
    <div>
      <Topbar session={session} />
      <h1 className="my-36 flex justify-center text-3xl">
        Community Coming Soon! <br /> Images of collections created:{' '}
        {collections.length}
      </h1>
      {/* <div className="flex flex-row">
        {collections.map((collection) => (
          <div key={collection.images[0].id} className="flex-basis-64 p-1">
            <Image
              src={collection.images[0].image}
              width={256}
              height={256}
              alt={detokenisePrompt(collection.images[0].prompt)}
              key={collection.images[0].id}
            />
          </div>
        ))}
      </div> */}
      <Footer />
    </div>
  );
};

export default Community;
