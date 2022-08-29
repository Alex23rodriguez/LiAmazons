import { Amazons, coords_to_square } from "amazons-game-engine";
import { Move as TMove, Size } from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { AmazonsState } from "./game";
import { Arrow } from "./tokens/arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import { makeAndRunAnim, makeTransform } from "./util";

const mymoves: TMove[] = [["c1", "c4"], ["a6"], ["a4", "d1"], ["d5"]];
let movnum = 0;

export const Board2: FC<BoardProps<AmazonsState>> = ({ ctx, G, moves }) => {
  console.log("making board");
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  if (global.window) {
    (window as any).amz = amz;
  }

  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    index_to_square(i, size)
  );

  const pieces = amz.pieces();

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  function onClick(a: any, b: any, c?: any) {
    if (amz.shooting()) {
      moves.move!(mymoves[movnum]);
      movnum++;
    } else {
      makeAndRunAnim(c.current, mymoves[movnum]?.at(-1)!, size, () => {
        moves.move!(mymoves[movnum]);
        movnum++;
      });
    }
  }

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
                square={sq}
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
          token={pieces["x"]!.includes(sq) ? "x" : ""}
          shooting={amz.shooting()}
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
