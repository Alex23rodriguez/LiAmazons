import { Client } from "boardgame.io/react";
import { AmazonsGame } from "../game";
import { Layout } from "../layouts/singleplayer";

const App = Client({
  game: AmazonsGame,
  board: Layout,
  debug: false,
});
export default App;
