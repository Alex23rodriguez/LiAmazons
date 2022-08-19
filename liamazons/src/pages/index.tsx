import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { Lobby } from "boardgame.io/react";
import { TicTacToeGame as TicTacToe } from "../games/tictactoe/game";
import { Board as TicTacToeBoard } from "../games/tictactoe/board";
import { clientEnv } from "../env/schema.mjs";
// import { TicTacToe } from "@/games/tictactoe/game";
// import { TicTacToeBoard } from "@/games/tictactoe/board";

const server = clientEnv.NEXT_PUBLIC_SERVER_URL;
// console.log(clientEnv.NEXT_PUBLIC_SERVER_URL);
const Home: NextPage = () => {
  const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <Lobby
          gameServer={server}
          lobbyServer={server}
          gameComponents={[{ game: TicTacToe, board: TicTacToeBoard }]}
        />
        ;
      </main>
    </>
  );
};

export default Home;
