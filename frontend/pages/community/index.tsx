import { NextPage } from 'next';
import Topbar from '@/components/TopBar';
import { useSession } from 'next-auth/react';
import Footer from '@/components/Footer';
import { GetServerSideProps } from 'next';

interface Props {
  prompts: string[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prompts = [
    'data example deeze nuts',
    'data example 2',
    'data example 3',
  ];
  return {
    props: {
      prompts: prompts,
    },
  };
};

export const Community: NextPage<Props> = ({ prompts }: Props) => {
  const { data: session } = useSession();
  return (
    <div>
      <Topbar session={session} />
      <h1 className="my-36 flex justify-center text-3xl">
        Community Coming Soon! {prompts[0]}
      </h1>
      <Footer />
    </div>
  );
};

export default Community;
