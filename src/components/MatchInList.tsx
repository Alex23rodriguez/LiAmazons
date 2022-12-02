import { Button } from "@mui/material";
import { LobbyAPI } from "boardgame.io";

export const MatchInList = ({
  matchID,
  players,
}: {
  matchID: string;
  players: any;
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Button
        onClick={() => (window.location.href = `/play/${matchID}`)}
        sx={{ width: "80%" }}
        variant="outlined"
      >
        Join match {matchID}
      </Button>
      {/* {players} */}
    </div>
  );
};
