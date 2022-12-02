import { useRouter } from "next/router";
import AmazonsClient from "../../components/MultiplayerGame";
import { LobbyClient } from "boardgame.io/client";
import { clientEnv } from "../../env/schema.mjs";
import { useEffect, useState } from "react";
import { LobbyAPI } from "boardgame.io";

const server = clientEnv.NEXT_PUBLIC_SERVER_URL;
const lobbyClient = new LobbyClient({ server });

const MatchPage = () => {
  const router = useRouter();
  const [matchId, setMatchId] = useState<string>();
  const [match, setMatch] = useState<LobbyAPI.JoinedMatch>();

  useEffect(() => {
    console.log("router ready?");
    if (!router.isReady) return;

    console.log("router ready!!");

    setMatchId(router.query.matchId as string);
    console.log(matchId);
  }, [router.isReady]);
  console.log("MATCH ID IS", matchId);

  if (typeof window !== "undefined" && matchId && !match) {
    console.log("joining match...");
    lobbyClient
      .joinMatch("amazons", matchId, {
        playerName: "testing",
      })
      .then((joinedMatch) => {
        console.log("match joined!!", joinedMatch);
        setMatch(joinedMatch);
      });
  }

  return matchId ? <AmazonsClient matchID={matchId} /> : "Loading...";
};

export default MatchPage;
