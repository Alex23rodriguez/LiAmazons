import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { SvgToken } from "../games/amazons/tokens/svgtoken";

export const PlayerInfo = ({
  id,
  isPlayer,
  turn,
}: {
  id: string;
  isPlayer: boolean;
  turn: boolean;
}) => {
  const theme = useTheme();
  let color =
    theme.palette.mode === "light"
      ? theme.palette.success.light
      : theme.palette.success.main;
  return (
    <Card
      elevation={2}
      sx={{
        height: 1,
        flex: 1,
        placeItems: "center",
        display: "grid",
        fontWeight: "bold",
        /* outline: "solid", */
        backgroundColor: turn ? color : "gray",
      }}
    >
      Player {id} {isPlayer && "(you)"}
      <div style={{ height: "30px" }}>
        <SvgToken token={id === "0" ? "w" : "b"} />
      </div>
    </Card>
  );
};
