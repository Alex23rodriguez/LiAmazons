import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC, memo } from "react";
// import { Board } from "./board";
import { amz, Board2 } from "./board2";
import { AmazonsState } from "./game";

export const GameContext = createContext(null);

export const MyPage: FC<BoardProps<AmazonsState>> = (props) => {
  return (
    <>
      <Board2 {...props} />
      {/*
      <Settings /> 
      <Chat />
      */}
    </>
  );
};

export const Page = memo(MyPage, (prev, next) => {
  (window as any).G = next.G;

  console.log("calling memo");

  if (prev.G.fen === next.G.fen) return false; // only update board when comparing different fens

  console.log("fens are different!");

  const ans = next.G.fen === amz.fen();

  console.log("amz and G are equal? ", ans);
  if (!ans) {
    console.log("amz", amz.fen());
    console.log("G", next.G.fen);
  }
  return ans;
});
