import Paper from "@mui/material/Paper";

export const PlayerInfo = ({
  id,
  isPlayer,
  turn,
}: {
  id: string;
  isPlayer: boolean;
  turn: boolean;
}) => {
  return (
    <Paper style={{ marginBottom: "20px" }}>
      Hello! im {id} {isPlayer && "(you)"}
    </Paper>
  );
};
