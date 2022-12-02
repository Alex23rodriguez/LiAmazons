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
    if (!router.isReady) return;

    setMatchId(router.query.matchId as string);
    console.log(matchId);
  }, [router.isReady]);

  if (typeof window !== "undefined" && matchId && !match) {
    console.log("joining match...");
    lobbyClient
      .joinMatch("amazons", matchId, {
        playerName: new Date().toLocaleString(),
      })
      .then((joinedMatch) => {
        console.log("match joined!!", joinedMatch);
        setMatch(joinedMatch);
      })
      .catch((err) => {
        console.log("unable to join match... joining as spectator");
        setMatch({ playerID: null as any, playerCredentials: null as any });
      });
  }

  return match ? (
    <AmazonsClient
      matchID={matchId}
      credentials={match.playerCredentials}
      playerID={match.playerID}
    />
  ) : (
    "Loading..."
  );
};

export default MatchPage;
