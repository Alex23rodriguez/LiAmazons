import { Amazons, DEFAULT_POSITIONS } from "amazons-game-engine";

import type { Game, MoveFn, MoveMap, TurnConfig } from "boardgame.io";
import type { FEN, Move } from "amazons-game-engine/dist/types";

export interface AmazonsState {
  fen: FEN;
}

function Load(fen: FEN) {
  return Amazons(fen);
}
export const AmazonsGame: Game<AmazonsState> = {
  name: "amazons",

  setup: () => {
    return { fen: DEFAULT_POSITIONS[6]! };
    // return { fen: DEFAULT_POSITIONS[10], last_move: null };
    // return { fen: "2/wb w - 1", last_move: null };
  },

  moves: {
    move: ((G, ctx, m: Move) => {
      const amazons = Load(G.fen);
      if (
        (amazons.turn() == "w" && ctx.currentPlayer == "1") ||
        (amazons.turn() == "b" && ctx.currentPlayer == "0")
      ) {
        return { ...G };
      }
      amazons.move(m);
      return { fen: amazons.fen(), last_move: m };
    }) as MoveFn<AmazonsState>,

    random_move: ((G) => {
      const amazons = Load(G.fen);
      let move = amazons.random_move();
      return { fen: amazons.fen(), last_move: move };
    }) as MoveFn<AmazonsState>,
  } as MoveMap<AmazonsState>,

  turn: {
    minMoves: 2,
    maxMoves: 2,
  } as TurnConfig,

  endIf: (G) => {
    const amazons = Load(G.fen);
    if (amazons.game_over()) return amazons.turn(true);
  },
};
