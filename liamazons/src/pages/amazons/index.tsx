import { Client } from "boardgame.io/react";
import { AmazonsGame } from "../../games/amazons/game";
import { Page } from "../../games/amazons/page";

const App = Client({
  game: AmazonsGame,
  board: Page,
});
export default App;
