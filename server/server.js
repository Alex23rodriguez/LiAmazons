// server.js

import { Server } from "boardgame.io/server";
import { Amazons } from "./game";

const server = Server({ games: [Amazons] });
const PORT = process.env.PORT || 8000;

server.run(PORT);
