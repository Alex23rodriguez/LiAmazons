import { Button, ButtonGroup, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MiniBoard } from "./MiniBoard";

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
  const [index, changeIndex] = useState(0);

  return (
    <Stack alignItems="center" spacing={2}>
      <Typography>Board</Typography>
      <ButtonGroup
        variant="outlined"
        color="primary"
        size="large"
        sx={{ width: "100%" }}
      >
        <Button onClick={() => changeIndex(0)} sx={{ width: "25%" }}>
          6x6
        </Button>
        <Button onClick={() => changeIndex(1)} sx={{ width: "25%" }}>
          8x8
        </Button>
        <Button onClick={() => changeIndex(2)} sx={{ width: "25%" }}>
          10x10
        </Button>
        <Button onClick={() => changeIndex(0)} sx={{ width: "25%" }}>
          Custom
        </Button>
      </ButtonGroup>
      {boards[index]}
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
