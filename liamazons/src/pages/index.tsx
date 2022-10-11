import { Header } from "../components/Header";
import type { NextPage } from "next";
// import Head from "next/head";
import Link from "next/link";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Header />
      <main className="container flex flex-col items-center justify-between min-h-[50vh] p-6 mx-auto">
        <span className="font-bold text-6xl text-center">liamazons</span>
        <span className="font-bold text-4xl text-center">
          The best way to play Game of the Amazons
        </span>
        <Link href="/amazons">
          <a>Play Locally</a>
        </Link>
        <Link href="/lobby">
          <a>Play Online</a>
        </Link>
        <Link href="#">
          <a>Tutorial (coming soon)</a>
        </Link>
        <Link href="#">
          <a>Play a Friend (coming soon)</a>
        </Link>
        <Link href="#">
          <a>Play the computer (coming soon)</a>
        </Link>
      </main>
    </>
  );
};

export default Home;
