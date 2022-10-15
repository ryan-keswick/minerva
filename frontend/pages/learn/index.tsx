import { NextPage } from 'next';
import Topbar from '@/components/TopBar';
import { useSession } from 'next-auth/react';
import Footer from '@/components/Footer';

export const Learn: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Topbar session={session} />
      <h1 className="my-36 flex justify-center text-3xl">Coming Soon!</h1>
      <Footer />
    </div>
  );
};

export default Learn;
