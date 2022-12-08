import { PlayerInfo } from "@/components/PlayerInfo";
import { Box, Stack } from "@mui/material";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { createContext, FC } from "react";
// import { Board } from "./board";
import { Board } from "../board";
import Chat from "../chat";
import { AmazonsState } from "../game";
import { Container } from "@mui/system";

export const GameContext = createContext(null);

export const Layout: FC<BoardProps<AmazonsState>> = (props) => {
  /* console.log(props.ctx) */
  return (
    <Container sx={{ padding: { xs: "10px" } }}>
      {/* <Stack direction="row" justifyContent="space-between"> */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
      >
        <Box sx={{ width: { sm: "calc(100vh - 180px)" } }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ height: 80 }}
            paddingBottom="10px"
          >
            {props.ctx.playOrder.map((p) => (
              <PlayerInfo
                key={p}
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
        </Box>
        {props.isMultiplayer && props.playerID !== null && (
          <Chat onSend={props.sendChatMessage} messages={props.chatMessages} />
        )}
      </Stack>
    </Container>
  );
};
