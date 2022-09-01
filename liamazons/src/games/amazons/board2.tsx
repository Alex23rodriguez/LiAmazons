import { Amazons } from "amazons-game-engine";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC, RefObject, useCallback, useRef, useState } from "react";
import { AmazonsState } from "./game";
import { ArrowAnim } from "./tokens/anim_arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import { makeAndRunAnim, makeTransformFunction, shootAnim } from "./util";

export const Board2: FC<BoardProps<AmazonsState>> = ({
  ctx,
  G,
  moves,
  ...boardProps
}) => {
  console.log("making board");
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const [selectedSq, setSelectedSq] = useState<TSquare | null>(null);
  const [selectedQ, setSelectedQ] = useState<["b" | "w", number] | null>(null);
  const [movable, setMovable] = useState(
    amz.shooting() ? (amz.moves().flat() as TSquare[]) : []
  );

  if (global.window) {
    (window as any).amz = amz;
    (window as any).board = boardProps;
    (window as any).forceUpdate = forceUpdate;
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

  const onClick = (token: string, sq: TSquare) => {
    if (ctx.gameover) return;
    if (amz.shooting()) {
      // place an arrow
      if (movable.includes(sq) && selectedSq) {
        // playing it safe
        shootAnim(selectedSq, sq, transformFn, () => {
          setMovable([]);
          setSelectedSq(null);
          moves.move!([sq]);
        });
      }
      return;
    }

    if (token === amz.turn() && sq != selectedSq) {
      // select a queen
      const poss_moves = amz.moves_dict()[sq]; //playing it safe

      const queenId = pieces[token].indexOf(sq);
      if (queenId === -1) {
        console.error("no queen found at square", sq);
      }
      setSelectedQ([token, queenId]);

      if (poss_moves) {
        setSelectedSq(sq);
        setMovable(poss_moves);
      } else {
        console.error("no moves was not supposed to happen");
      }
      return;
    }

    if (movable.includes(sq)) {
      //move a queen

      const [team, id] = selectedQ!;

      makeAndRunAnim(myRefs[team][id]!.current!, sq, transformFn, () => {
        amz.move([selectedSq!, sq]);
        setMovable(amz.moves().flat() as TSquare[]);
        setSelectedSq(sq);
        moves.move!([selectedSq, sq]);
      });
      return;
    } else if (selectedQ) {
      unselectQueen();
    }

    console.log("some other sht happened");
  };
  function unselectQueen() {
    setSelectedSq(null);
    setSelectedQ(null);
    setMovable([]);
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
          token={
            pieces["x"]!.includes(sq) ? "x" : movable.includes(sq) ? "m" : ""
          }
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
