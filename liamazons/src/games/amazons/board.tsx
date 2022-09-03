import { Amazons } from "amazons-game-engine";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AmazonsState } from "./game";
import { ArrowAnim } from "./tokens/anim_arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import {
  makeAndRunAnim,
  makeTransformFunction,
  shootAnim,
  transformQueens,
} from "./util";

let animating: TSquare | null = null;

if (global.window) {
  (window as any).animating = animating;
}

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

  useLayoutEffect(() => {
    compareSquares();
  }, []);
  // end queen refs declaration

  compareSquares();

  function compareSquares() {
    if (animating) {
      return;
    }

    transformQueens(pieces, transformFn);
  }

  // board dimensions
  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  const onClick = (token: string, sq: TSquare) => {
    if (ctx.gameover) return;
    if (amz.shooting()) {
      // place an arrow
      if (movable.includes(sq) && selectedSq) {
        animating = sq;
        moves.move!([sq]);
        shootAnim(selectedSq, sq, transformFn, () => {
          animating = null;
          unselect();
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
      console.log("set selected queen to", token, queenId);

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
      console.log("moving", team, id);
      console.log("moving from", selectedSq, sq);

      animating = sq;
      if (global.window) {
        (window as any).animating = animating;
      }
      amz.move([selectedSq!, sq]);
      moves.move!([selectedSq, sq]);
      makeAndRunAnim(team + id, sq, transformFn, () => {
        animating = null;
        if (global.window) {
          (window as any).animating = animating;
        }
      });
      return;
    } else if (selectedQ) {
      unselect();
    }
  };

  // function updateQueenRef(team: "b" | "w", from: TSquare, to: TSquare) {}

  function unselect() {
    setSelectedSq(null);
    setSelectedQ(null);
  }

  function getToken(sq: TSquare) {
    if (movable.includes(sq)) return "m";
    if (animating !== sq && pieces.x.includes(sq)) return "x";
    return "";
  }

  if (global.window) {
    (window as any).amz = amz;
    (window as any).board = boardProps;
    (window as any).G = G;
    (window as any).ctx = ctx;
    (window as any).forceUpdate = forceUpdate;
  }

  return (
    <div
      id="board"
      className="select-none grid grid-cols-6"
      style={{ width: board_size }}
    >
      {Object.entries(pieces).map(
        ([piece, sq_array]) =>
          piece !== "x" &&
          sq_array.map((sq, i) => (
            <Queen
              index={i}
              key={piece + i}
              square={sq}
              team={piece as "w" | "b"}
              size={square_size}
              onClick={onClick}
            />
          ))
      )}
      <ArrowAnim size={square_size} />

      {squares_static.map(([sq, color]) => (
        <Square
          key={sq}
          token={getToken(sq)}
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
