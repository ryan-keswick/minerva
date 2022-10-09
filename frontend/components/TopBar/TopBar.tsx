import Image from 'next/image';
import Link from 'next/link';
import homeImage from '@public/images/homeImage.png';
import { signIn, signOut } from 'next-auth/react';

const TopBarItem = ({ text }: { text: string }) => {
  return (
    <div className="grid h-10 w-24 place-content-center rounded-full hover:bg-dark-blue hover:text-white">
      <div>{text}</div>
    </div>
  );
};

interface Props {
  session: any;
}

export const TopBar = ({ session }: Props) => {
  return (
    <div className="grid h-20 grid-cols-3 grid-rows-1 place-content-between">
      <div className="m-5 flex w-32 rounded-full pl-2">
        <Link href="/" className="grid place-content-center rounded-full">
          <Image
            className="h-10 w-10 rounded-full"
            src={homeImage}
            alt="home"
            width={35}
            height={25}
          />
        </Link>
        <h1 className="grid place-content-center">Minerva</h1>
      </div>
      <div className="invisible my-5 flex justify-between md:visible ">
        <TopBarItem text={'Learn'} />
        <TopBarItem text={'Community'} />
        <TopBarItem text={'Pricing'} />
      </div>
      <div className="grid place-content-end">
        {session ? (
          <>
            Signed in as {session.user.name} <br />
            <button
              className="m-5 grid h-10 w-24 place-content-center rounded-full hover:bg-dark-blue hover:text-white"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            className="m-5 grid h-10 w-24 place-content-center rounded-full hover:bg-dark-blue hover:text-white"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
