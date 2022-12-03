import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { AmazonsGame } from "../game";
import { Layout } from "../layouts/multiplayer";
import { clientEnv } from "@/env/schema.mjs";

const App = Client({
  game: AmazonsGame,
  board: Layout,
  multiplayer: SocketIO({ server: clientEnv.NEXT_PUBLIC_BGIO_URL }),
  debug: false,
});

export default App;
