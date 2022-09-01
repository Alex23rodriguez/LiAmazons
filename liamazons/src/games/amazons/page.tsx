import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC } from "react";
// import { Board } from "./board";
import { Board } from "./board";
import { AmazonsState } from "./game";

export const GameContext = createContext(null);

export const Page: FC<BoardProps<AmazonsState>> = (props) => {
  return (
    <>
      <Board {...props} />
      {/*
      <Settings /> 
      <Chat />
      */}
    </>
  );
};
