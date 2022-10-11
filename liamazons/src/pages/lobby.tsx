import { Header } from "../components/Header";
import { Lobby } from "boardgame.io/react";
import { NextPage } from "next";
import { clientEnv } from "../env/schema.mjs";
import { AmazonsGame as Amazons } from "../games/amazons/game";
import { Page as AmazonsBoard } from "../games/amazons/page";

const server = clientEnv.NEXT_PUBLIC_SERVER_URL;

const LobbyPage: NextPage = () => {
  return (
    <>
      <Header />
      <Lobby
        gameServer={server}
        lobbyServer={server}
        gameComponents={[{ game: Amazons, board: AmazonsBoard }]}
        refreshInterval={5000}
      />
    </>
  );
};

export default LobbyPage;
