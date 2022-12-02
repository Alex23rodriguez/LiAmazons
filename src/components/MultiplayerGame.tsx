import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { AmazonsGame } from "../games/amazons/game";
import { Page } from "../games/amazons/page";
import { clientEnv } from "@/env/schema.mjs";

const App = Client({
  game: AmazonsGame,
  board: Page,
  multiplayer: SocketIO({ server: clientEnv.NEXT_PUBLIC_BGIO_URL }),
  debug: false,
});

export default App;
