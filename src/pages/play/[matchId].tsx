import { useRouter } from "next/router";
import MultiplayerClient from "../../games/amazons/clients/multiplayer";
import { LobbyClient } from "boardgame.io/client";
import { clientEnv } from "../../env/schema.mjs";
import { useEffect, useState } from "react";
import { LobbyAPI } from "boardgame.io";
import { useSession } from "next-auth/react";

const server = clientEnv.NEXT_PUBLIC_SERVER_URL;
const lobbyClient = new LobbyClient({ server });

const MatchPage = () => {
  const router = useRouter();
  const [matchId, setMatchId] = useState<string>();
  const [match, setMatch] = useState<LobbyAPI.JoinedMatch>();

  const { data: session } = useSession();
  const pName =
    session?.user?.email ?? "anon_" + Math.random().toString(36).substring(2);

  useEffect(() => {
    if (!router.isReady) return;

    setMatchId(router.query.matchId as string);
  }, [router.isReady]);
  useEffect(() => {
    if (!matchId || typeof window === "undefined") return;

    console.log("joining match...");
    lobbyClient
      .joinMatch("amazons", matchId, {
        playerName: pName,
        /* playerID: "1", */
        /* playerID: pName */
      })
      .then((joinedMatch) => {
        console.log("match joined!!", joinedMatch);
        setMatch(joinedMatch);
      })
      .catch((err) => {
        console.log("unable to join match... joining as spectator");
        setMatch({ playerID: null as any, playerCredentials: null as any });
      });
  }, [matchId]);

  return match ? (
    <MultiplayerClient
      matchID={matchId}
      credentials={match.playerCredentials}
      playerID={match.playerID}
    />
  ) : (
    "Loading..."
  );
};

export default MatchPage;
