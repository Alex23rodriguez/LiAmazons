import { Amazons, coords_to_square } from "amazons-game-engine";
import { FEN, Size, Square as TSquare } from "amazons-game-engine/dist/types";
import { useState, useMemo, FC } from "react";

import type { BoardProps } from "boardgame.io/react";
import type { AmazonsState } from "./game";

export const Board: FC<BoardProps<AmazonsState>> = ({ ctx, G, moves }) => {
  return <div>hi</div>;
};
