import { Amazons } from "amazons-game-engine";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createRef, FC, RefObject, useCallback, useRef, useState } from "react";
import { AmazonsState } from "./game";
import { ArrowAnim } from "./tokens/anim_arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import { makeAndRunAnim, makeTransformFunction, shootAnim } from "./util";

export const Board: FC<BoardProps<AmazonsState>> = ({
  ctx,
  G,
  moves,
  ...boardProps
}) => {
  // console.log("making board");
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
    (window as any).G = G;
    (window as any).ctx = ctx;
    (window as any).forceUpdate = forceUpdate;
  }

  const transformFn = makeTransformFunction(amz);

  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    amz.index_to_square(i)
  );

  const pieces = amz.pieces();
  const queenRefs = {
    w: useRef<RefObject<HTMLDivElement>[]>([]),
    b: useRef<RefObject<HTMLDivElement>[]>([]),
  };

  for (const team of ["b", "w"] as ["b", "w"]) {
    for (const sq of pieces[team as "b" | "w"]) {
      queenRefs.w.current = pieces.w.map(
        (_, i) => queenRefs.w.current[i] ?? createRef<HTMLDivElement>()
      );
      queenRefs.b.current = pieces.w.map(
        (_, i) => queenRefs.b.current[i] ?? createRef<HTMLDivElement>()
      );
    }
  }

  queenRefs.w.current.forEach((el, index) => {
    if (el.current) el.current!.style.transform = transformFn(pieces.w[index]!);
  });

  queenRefs.b.current.forEach((el, index) => {
    if (el.current) el.current!.style.transform = transformFn(pieces.b[index]!);
  });

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  const onClick = (token: string, sq: TSquare) => {
    if (ctx.gameover) return;
    if (amz.shooting()) {
      // place an arrow
      if (movable.includes(sq) && selectedSq) {
        // playing it safe
        shootAnim(selectedSq, sq, transformFn, () => {
          unselect();
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

      makeAndRunAnim(
        queenRefs[team].current[id]!.current!,
        sq,
        transformFn,
        () => {
          amz.move([selectedSq!, sq]);
          setMovable(amz.moves().flat() as TSquare[]);
          setSelectedSq(sq);
          moves.move!([selectedSq, sq]);
        }
      );
      return;
    } else if (selectedQ) {
      unselect();
    }

    console.log("some other sht happened");
  };
  function unselect() {
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
                ref={queenRefs[piece as "w" | "b"].current[i]}
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
