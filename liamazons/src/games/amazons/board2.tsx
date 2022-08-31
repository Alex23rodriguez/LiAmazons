import { Amazons } from "amazons-game-engine";
import {
  Move as TMove,
  Square as TSquare,
} from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC, RefObject, useEffect, useRef } from "react";
import { AmazonsState } from "./game";
import { ArrowAnim } from "./tokens/anim_arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import { makeAndRunAnim, makeTransformFunction, shootAnim } from "./util";

const mymoves: TMove[] = [["c1", "c4"], ["a6"], ["a4", "d1"], ["d5"]];
let movnum = 0;
let from: TSquare = "a1";

export const Board2: FC<BoardProps<AmazonsState>> = ({ ctx, G, moves }) => {
  console.log("making board");
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  if (global.window) {
    (window as any).amz = amz;
  }

  const transformFn = makeTransformFunction(amz);

  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    amz.index_to_square(i)
  );

  const pieces = amz.pieces();
  const myRefs: {
    w: RefObject<HTMLDivElement>[];
    b: RefObject<HTMLDivElement>[];
  } = {
    w: pieces["w"].map(() => useRef<HTMLDivElement>(null)),
    b: pieces["b"].map(() => useRef<HTMLDivElement>(null)),
  };

  let teams: ["w", "b"] = ["w", "b"];
  for (let team of teams) {
    for (let i in pieces[team]) {
      let ref = myRefs[team][i]!;
      if (ref.current)
        ref.current.style.transform = transformFn(pieces[team][i]!);
    }
  }

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  function onClick(a: any, b: any) {
    console.log(a, b);
    if (amz.shooting()) {
      shootAnim(from, mymoves[movnum]![0], amz, () => {
        moves.move!(mymoves[movnum]);
        movnum++;
      });
    } else {
      makeAndRunAnim(
        myRefs[a][b].current,
        mymoves[movnum]!.at(-1)!,
        amz,
        () => {
          moves.move!(mymoves[movnum]);
          from = mymoves[movnum]![1]!;
          movnum++;
        }
      );
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
                ref={myRefs[piece as "w" | "b"][i]!}
                id={i}
                key={piece + i}
                square={sq}
                team={piece as "w" | "b"}
                size={square_size}
                onClick={onClick}
                transformFn={transformFn}
              />
            ))
      )}
      <ArrowAnim size={square_size} />

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
