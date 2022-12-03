import { PlayerInfo } from "@/components/PlayerInfo";
import { Stack } from "@mui/material";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC } from "react";
// import { Board } from "./board";
import { Board } from "../board";
import Chat from "../chat";
import { AmazonsState } from "../game";

export const GameContext = createContext(null);

export const Layout: FC<BoardProps<AmazonsState>> = (props) => {
  /* console.log(props.ctx) */
  return (
    <>
      <div>
        <div style={{ aspectRatio: "1/1", width: "100%" }}>
          <Board {...props} />
        </div>
        <Stack direction="row" justifyContent="space-between">
          {props.ctx.playOrder.map((p) => (
            <PlayerInfo
              id={p}
              isPlayer={props.playerID === p}
              turn={props.ctx.currentPlayer === p}
            />
          ))}
        </Stack>
      </div>
      {props.isMultiplayer && props.playerID !== null && (
        <>
          <div style={{ marginTop: "1rem" }} />
          <Chat onSend={props.sendChatMessage} messages={props.chatMessages} />
        </>
      )}
    </>
  );
};
