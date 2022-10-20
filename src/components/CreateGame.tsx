import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { MiniBoard } from "./MiniBoard";
import { is_valid_layout } from "amazons-game-engine";

const boardWidth = "250px";

const boards = [
  <MiniBoard layout="3b2/6/b5/5w/6/2w3" width={boardWidth} />,
  <MiniBoard layout="3b4/8/b6b/8/8/w6w/8/4w3" width={boardWidth} />,
  <MiniBoard
    layout="3b2b3/10/10/b8b/10/10/w8w/10/10/3w2w3"
    width={boardWidth}
  />,
];

export const CreateGame = () => {
  const [index, setIndex] = useState(0);
  const [customLayout, setCustomLayout] = useState(
    "x3w2x/x6x/xb5x/x5bx/x6x/x2w3x"
  );
  const [layoutError, setLayoutError] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
    const valid = is_valid_layout(e.target.value);
    if (valid.error) setLayoutError(valid.error);
    else {
      setLayoutError("");
      setCustomLayout(e.target.value);
    }
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Typography>Board</Typography>
      <ButtonGroup
        variant="outlined"
        color="primary"
        size="large"
        sx={{ width: "100%" }}
      >
        <Button onClick={() => setIndex(0)} sx={{ width: "25%" }}>
          6x6
        </Button>
        <Button onClick={() => setIndex(1)} sx={{ width: "25%" }}>
          8x8
        </Button>
        <Button onClick={() => setIndex(2)} sx={{ width: "25%" }}>
          10x10
        </Button>
        <Button onClick={() => setIndex(3)} sx={{ width: "25%" }}>
          Custom
        </Button>
      </ButtonGroup>
      {index !== 3 ? (
        boards[index]
      ) : (
        <>
          <TextField
            label="Enter layout"
            variant="standard"
            onChange={onChange}
            defaultValue="x3w2x/x6x/xb5x/x5bx/x6x/x2w3x"
            sx={{ width: boardWidth }}
          />
          <MiniBoard layout={customLayout} width={boardWidth} />
          {layoutError && <Typography color="error">{layoutError}</Typography>}
        </>
      )}
      <Divider />
      <Typography>Time control</Typography>
      <ButtonGroup
        variant="outlined"
        color="primary"
        size="large"
        sx={{ width: "100%" }}
      >
        <Button sx={{ width: "20%" }}>3 + 2</Button>
        <Button sx={{ width: "20%" }}>5 + 2</Button>
        <Button sx={{ width: "20%" }}>10 + 10</Button>
        <Button sx={{ width: "20%" }}>20 + 15</Button>
        <Button sx={{ width: "20%" }}>unlimited</Button>
      </ButtonGroup>
    </Stack>
  );
};
