import type { NextPage } from "next";
import Head from "next/head";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="liamazons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-between min-h-[50vh] p-4 mx-auto">
        <span className="font-bold text-6xl text-center">
          The best way to play Game of the Amazons
        </span>
        <a href="/amazons">Play Locally</a>
        <a href="/tutorial">Tutorial</a>
        <a>Play a Friend</a>
        <a href="/lobby">Play Online</a>
      </main>
    </>
  );
};

export default Home;
