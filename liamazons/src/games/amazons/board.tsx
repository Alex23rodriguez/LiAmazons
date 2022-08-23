import { Amazons, coords_to_square } from "amazons-game-engine";
import {
  FEN,
  Piece,
  Size,
  Square as TSquare,
} from "amazons-game-engine/dist/types";
import { useState, useMemo, FC } from "react";
// import { useAutoAnimate } from "@formkit/auto-animate/react";

import type { BoardProps } from "boardgame.io/react";
import type { AmazonsState } from "./game";
import { Queen } from "./queen";
import { Square } from "./square";
// import { global } from "styled-jsx/css";

export const Board: FC<BoardProps<AmazonsState>> = ({ ctx, G, moves }) => {
  // console.log("hi");
  // console.log(ctx, G);
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    index_to_square(i, size)
  );

  const [pieces, setPieces] = useState(amz.pieces());
  const [selected, setSelected] = useState<TSquare | null>();
  // (window as any).pieces = pieces;

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;
  const onClick = (sq: TSquare, token: string) => {
    // console.log(sq, token);
    setSelected(sq);
    setMyq(sq);
    // console.log(myq);
  };

  // const [parent] = useAutoAnimate<HTMLDivElement>();

  const [myq, setMyq] = useState<TSquare>("a1");
  // TODO: remove grid-cols-6
  // if ((global as any).window) (window as any).setMyq = setMyq;
  return (
    <div
      // ref={parent}
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
                square={sq}
                team={piece}
                size={square_size}
                onClick={onClick}
              />
            ))
      )}
      <Queen
        queenId={123}
        key={"myqueen"}
        square={myq}
        team="w"
        size={square_size}
        onClick={onClick}
      />

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
    // </Flipper>
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
