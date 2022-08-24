import { Amazons, coords_to_square } from "amazons-game-engine";
import { Size, Square as TSquare } from "amazons-game-engine/dist/types";
import {  FC, RefObject, } from "react";

import type { BoardProps } from "boardgame.io/react";
import type { AmazonsState } from "./game";
import { Queen } from "./queen";
import { Square } from "./square";
import { makeAndRunAnim, makeTransform } from "./util";

export const Board: FC<BoardProps<AmazonsState>> = ({ ctx, G, moves }) => {
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    index_to_square(i, size)
  );

  let pieces = amz.pieces();
  let currElement: HTMLDivElement | null;

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  function onClick(token: "", sq: TSquare): void; // for squares
  function onClick(
    token: string,
    id: number,
    ref: RefObject<HTMLDivElement>
  ): void; // for queens
  function onClick(token: string): void; // for other
  function onClick(
    token: string,
    sq_or_id?: TSquare | number,
    ref?: RefObject<HTMLDivElement>
  ) {
    if (token === "") {
      // square logic
      makeAndRunAnim(currElement!, sq_or_id as TSquare, size);
    } else if (token === "w" || token === "b") {
      // queen logic
      currElement = ref!.current;
    } else if (token === "x") {
      // arrow logic
    }
  }

  // TODO: remove grid-cols-6
  return (
    <div
      id="board"
      className="select-none grid grid-cols-6"
      style={{ width: board_size }}
    >
      {Object.entries(pieces).map(([piece, sq_array]) =>
        piece === "x"
          ? null
          : sq_array.map((sq, i) => (
              <Queen
                queenId={i}
                key={i}
                initTransform={makeTransform(sq, size)}
                team={piece as "w" | "b"}
                size={square_size}
                onClick={onClick}
              />
            ))
      )}

      {square_names.map((sq) => (
        <Square
          key={sq}
          token={pieces["x"]?.includes(sq) ? "x" : ""}
          square={sq}
          color={amz.square_color(sq)}
          onClick={onClick}
          selected={false}
        />
      ))}
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
