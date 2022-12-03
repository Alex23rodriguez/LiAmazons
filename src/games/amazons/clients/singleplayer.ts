import { Client } from "boardgame.io/react";
import { AmazonsGame } from "../game";
/* import { Layout } from "../layouts/singleplayer"; */
import { Layout } from "../layouts/multiplayer";

const App = Client({
  game: AmazonsGame,
  board: Layout,
  debug: false,
});
export default App;
