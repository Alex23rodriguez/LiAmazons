import { Amazons } from "amazons-game-engine";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import {
  createRef,
  FC,
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AmazonsState } from "./game";
import { ArrowAnim } from "./tokens/anim_arrow";
import { Queen } from "./tokens/queen";
import { Square } from "./tokens/square";
import {
  makeAndRunAnim,
  makeBasicAnim,
  makeTransformFunction,
  shootAnim,
} from "./util";
import UIfx from "uifx";
import MoveAudio from "../../assets/sound/Move.mp3";
import ShootAudio from "../../assets/sound/pop.mp3";

let myMoveAudio: UIfx;
let myShootAudio: UIfx;
if (global.document) {
  myMoveAudio = new UIfx(MoveAudio);
  myShootAudio = new UIfx(ShootAudio);
  myShootAudio.setVolume(0.5)
}

let animating: TSquare | null = null;

export const Board: FC<BoardProps<AmazonsState>> = ({
  ctx,
  G,
  moves,
  isMultiplayer,
  isActive,
}) => {
  const amz = new Amazons(G);
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

  useLayoutEffect(() => {
    if (amz.shooting() && amz.shooting_sq() !== selectedSq) {
      setSelectedSq(amz.shooting_sq());
      return;
    }

    if (selectedSq) {
      if (!amz.moves_dict()[selectedSq]) {
        setSelectedSq(null);
        if (G.last_move.length === 3) {
          animating = G.last_move[2]!;
          shootAnim(G.last_move[1]!, G.last_move[2]!, transformFn, () => {
            animating = null;
            unselect();
            forceUpdate();
          });
          myShootAudio.play();
        }
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

  queenRefs.w.current = pieces.w.map(
    (_, i) => queenRefs.w.current[i] ?? createRef<HTMLDivElement>()
  );
  queenRefs.b.current = pieces.b.map(
    (_, i) => queenRefs.b.current[i] ?? createRef<HTMLDivElement>()
  );

  useLayoutEffect(() => {
    compareSquares();
  }, []);
  // end queen refs declaration

  compareSquares();

  function compareSquares() {
    if (animating) {
      return;
    }
    let moved = false;
    for (const team of ["b", "w"] as ["b", "w"]) {
      queenRefs[team].current.forEach((el, index) => {
        if (!el.current) return;
        const correct = transformFn(pieces[team][index]!);
        if (el.current.style.transform !== correct) {
          moved = true;
          makeBasicAnim(el.current, correct);
        }
      });
    }
    if (moved) {
      myMoveAudio.play();
    }
  }

  // board dimensions
  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  const onClick = (token: string, sq: TSquare) => {
    if (ctx.gameover) return;
    if (isMultiplayer && !isActive) return;

    if (amz.shooting()) {
      // place an arrow
      if (movable.includes(sq) && selectedSq) {
        moves.move!([sq]);
      }
      return;
    }

    if (token === amz.turn() && sq != selectedSq) {
      // select a queen
      const poss_moves = amz.moves_dict()[sq];

      const queenId = pieces[token].indexOf(sq);
      if (queenId === -1) {
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

      animating = sq;
      amz.move([selectedSq!, sq]);
      moves.move!([selectedSq, sq]);
      myMoveAudio.play();
      makeAndRunAnim(
        queenRefs[team].current[id]!.current!,
        sq,
        transformFn,
        () => {
          animating = null;
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

  function getToken(sq: TSquare) {
    if (movable.includes(sq)) return "m";
    if (animating !== sq && pieces.x.includes(sq)) return "x";
    return "";
  }

  return (
    <div
      id="board"
      className={`select-none grid grid-cols-${cols}`}
      style={{ width: board_size }}
    >
      {Object.entries(pieces).map(
        ([piece, sq_array]) =>
          piece !== "x" &&
          sq_array.map((sq, i) => (
            <Queen
              ref={queenRefs[piece as "w" | "b"].current[i]}
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
          selected={G.last_move.includes(sq)}
        />
      ))}
    </div>
  );
};
