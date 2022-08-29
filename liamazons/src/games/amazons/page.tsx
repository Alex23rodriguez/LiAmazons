import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC } from "react";
import { Board } from "./board";
import { Board2 } from "./board2";
import { AmazonsState } from "./game";

export const GameContext = createContext(null);

export const Page: FC<BoardProps<AmazonsState>> = (props) => {
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
