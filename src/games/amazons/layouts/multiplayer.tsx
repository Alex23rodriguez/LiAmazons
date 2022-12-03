import { PlayerInfo } from "@/components/PlayerInfo";
import { Stack } from "@mui/material";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC } from "react";
// import { Board } from "./board";
import { Board } from "../board";
import Chat from "../chat";
import { AmazonsState } from "../game";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";

export const GameContext = createContext(null);

export const Layout: FC<BoardProps<AmazonsState>> = (props) => {
  /* console.log(props.ctx) */
  return (
    <Container>
      {/* <Stack direction="row" justifyContent="space-between"> */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ height: 80 }}
        padding="10px 0"
      >
        {props.ctx.playOrder.map((p) => (
          <PlayerInfo
            id={p}
            isPlayer={props.playerID === p}
            turn={props.ctx.currentPlayer === p}
          />
        ))}
      </Stack>
      {/* </Stack> */}
      <div style={{ aspectRatio: "1/1", width: "100%" }}>
        <Board {...props} />
      </div>
      {props.isMultiplayer && props.playerID !== null && (
        <>
          <div style={{ marginTop: "1rem" }} />
          <Chat onSend={props.sendChatMessage} messages={props.chatMessages} />
        </>
      )}
    </Container>
  );
};
