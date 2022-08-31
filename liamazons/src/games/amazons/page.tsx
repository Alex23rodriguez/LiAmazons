import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
// import { Board } from "./board";
import { Board2, amazonsAtom } from "./board2";
import { AmazonsState } from "./game";
import { memo } from "react";
import { useAtomValue } from "jotai";

export const MyPage: FC<BoardProps<AmazonsState>> = (props) => {
  console.log("rerendering page!");
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

export const Page = memo(MyPage, (prev, curr) => {
  console.log("calling memo");

  if (prev.G.fen === curr.G.fen) return false; // only prevent rerender when moves are made
  console.log("fens are equal! comparing with amazonsAtom");

  const amz = useAtomValue(amazonsAtom);

  const ans = curr.G.fen === amz.fen();
  console.log("amz and G coincide? ", ans);

  return ans;
});
