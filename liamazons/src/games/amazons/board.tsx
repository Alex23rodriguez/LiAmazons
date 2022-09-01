import { Amazons } from "amazons-game-engine";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import {
  createRef,
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AmazonsState } from "./game";
import { ArrowAnim } from "./tokens/anim_arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import { makeAndRunAnim, makeTransformFunction, shootAnim } from "./util";

let animating = true;

export const Board: FC<BoardProps<AmazonsState>> = ({
  ctx,
  G,
  moves,
  ...boardProps
}) => {
  const amz = Amazons(G.fen);
  const size = amz.size();
  const { rows, cols } = size;

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const [selectedSq, setSelectedSq] = useState<TSquare | null>(null);
  const [selectedQ, setSelectedQ] = useState<["b" | "w", number] | null>(null);
  const movable = useMemo(
    () =>
      amz.shooting()
        ? (amz.moves().flat() as TSquare[])
        : amz.moves_dict()[selectedSq!]
        ? amz.moves_dict()[selectedSq!]!
        : [],
    [amz.shooting_sq(), selectedSq]
  );

  useEffect(() => {
    if (amz.shooting() && amz.shooting_sq() !== selectedSq) {
      setSelectedSq(amz.shooting_sq());
      return;
    }

    if (selectedSq) {
      if (!amz.moves_dict()[selectedSq]) {
        setSelectedSq(null);
      }
    }
  }, [amz.fen()]);

  const transformFn = makeTransformFunction(amz);

  const squares_static: [TSquare, "dark" | "light"][] = useMemo(
    () =>
      Array.from({ length: cols * rows }, (_, i) => {
        const sq = amz.index_to_square(i);
        return [sq, amz.square_color(sq)];
      }),
    [rows, cols]
  );

  const pieces = amz.pieces();

  // start queen refs declaration
  const queenRefs = {
    w: useRef<RefObject<HTMLDivElement>[]>([]),
    b: useRef<RefObject<HTMLDivElement>[]>([]),
  };

  queenRefs.w.current = pieces.w.map((sq, i) => {
    if (queenRefs.w.current[i]) {
      queenRefs.w.current[i]!.current!.style.transform = transformFn(sq);
      return queenRefs.w.current[i]!;
    }
    console.log("creating black queen ref");

    return createRef<HTMLDivElement>();
  });
  queenRefs.b.current = pieces.b.map((sq, i) => {
    if (queenRefs.b.current[i]) {
      queenRefs.b.current[i]!.current!.style.transform = transformFn(sq);
      return queenRefs.b.current[i]!;
    }
    console.log("creating black queen ref");

    return createRef<HTMLDivElement>();
  });
  // end queen refs declaration

  // board dimensions
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
      const poss_moves = amz.moves_dict()[sq];

      const queenId = pieces[token].indexOf(sq);
      if (queenId === -1) {
        console.error("no queen found at square", sq);
      }
      setSelectedQ([token, queenId]);

      if (poss_moves) {
        //playing it safe
        setSelectedSq(sq);
      } else {
        console.error("no moves was not supposed to happen");
      }
      return;
    }

    if (movable.includes(sq)) {
      //move a queen

      const [team, id] = selectedQ!;

      animating = true;
      amz.move([selectedSq!, sq]);
      moves.move!([selectedSq, sq]);

      makeAndRunAnim(
        queenRefs[team].current[id]!.current!,
        sq,
        transformFn,
        () => {
          animating = false;
        }
      );
      return;
    } else if (selectedQ) {
      unselect();
    }
  };

  function unselect() {
    setSelectedSq(null);
    setSelectedQ(null);
  }

  if (global.window) {
    (window as any).amz = amz;
    (window as any).board = boardProps;
    (window as any).G = G;
    (window as any).ctx = ctx;
    (window as any).forceUpdate = forceUpdate;
    (window as any).onClick = onClick;
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
                // transformFn={transformFn}
                // initTransform={transformFn(sq)}
              />
            ))
      )}
      <ArrowAnim size={square_size} />

      {squares_static.map(([sq, color]) => (
        <Square
          key={sq}
          token={
            pieces["x"]!.includes(sq) ? "x" : movable.includes(sq) ? "m" : ""
          }
          shooting={amz.shooting()}
          square={sq}
          color={color}
          onClick={onClick}
          selected={false}
        />
      ))}
    </div>
  );
};
