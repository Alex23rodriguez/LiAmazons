import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC } from "react";
// import { Board } from "./board";
import { Board } from "./board";
import Chat from "./chat";
import { AmazonsState } from "./game";

export const GameContext = createContext(null);

export const Page: FC<BoardProps<AmazonsState>> = (props) => {
  return (
    <>
      <Board {...props} />
      {props.isMultiplayer && props.playerID !== null && (
        <>
          <div style={{ marginTop: "1rem" }} />
          <Chat onSend={props.sendChatMessage} messages={props.chatMessages} />
        </>
      )}
    </>
  );
};
