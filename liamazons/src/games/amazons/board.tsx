import { Amazons, coords_to_square } from "amazons-game-engine";
import { FEN, Size, Square as TSquare } from "amazons-game-engine/dist/types";
import { useState, useMemo, FC } from "react";

import type { BoardProps } from "boardgame.io/react";
import type { AmazonsState } from "./game";
import { Queen } from "./queen";

export const Board: FC<BoardProps<AmazonsState>> = ({ ctx, G, moves }) => {
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    index_to_square(i, size)
  );

  const [pieces, setPieces] = useState(amz.pieces);

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;
  const onClick = () => {};

  // TODO: remove grid-cols-6
  return (
    <div id="board" className="select-none grid grid-cols-6">
      {Object.entries(pieces).map(([piece, sq_array]) =>
        piece === "x"
          ? null
          : sq_array.map((sq, i) => (
              <Queen
                key={i}
                square={sq}
                team={piece}
                size={square_size}
                onClick={onClick}
              />
            ))
      )}
    </div>
  );
};

function index_to_square(index: number, size: Size) {
  return coords_to_square(
    {
      row: Math.floor(index / size.cols),
      col: index % size.cols,
    },
    size
  );
}
