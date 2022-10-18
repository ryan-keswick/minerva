import { NextPage } from 'next';
import Topbar from '@/components/TopBar';
import { useSession } from 'next-auth/react';
import Footer from '@/components/Footer';
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';

interface Props {
  collections: { prompt: string; image: string }[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const collections = await prisma.collection.findMany({
    where: {
      published: true,
      hidden: false,
    },
    select: {
      prompt: true,
      image: true,
    },
  });
  return {
    props: {
      collections: collections,
    },
  };
};

export const Community: NextPage<Props> = ({ collections }: Props) => {
  const { data: session } = useSession();
  return (
    <div>
      <Topbar session={session} />
      <h1 className="my-36 flex justify-center text-3xl">
        Community Coming Soon! <br /> Number of collections created:{' '}
        {collections.length}
      </h1>
      <Footer />
    </div>
  );
};

export default Community;
