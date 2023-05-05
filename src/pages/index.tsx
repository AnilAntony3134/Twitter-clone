import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const {data} = api.post.getAll.useQuery();
  const user = useUser()

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
          {!user.isSignedIn && <SignInButton/>}
          {!!user.isSignedIn && <SignOutButton/>}
        </div>
      </main>
    </>
  );
};

export default Home;
