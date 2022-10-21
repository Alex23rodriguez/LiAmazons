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
import { is_valid_fen, is_valid_layout } from "amazons-game-engine";

const boardWidth = "300px";

const boards = [
  <MiniBoard key={6} layout="3b2/6/b5/5w/6/2w3" width={boardWidth} />,
  <MiniBoard key={8} layout="3b4/8/b6b/8/8/w6w/8/4w3" width={boardWidth} />,
  <MiniBoard
    key={10}
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

  const [time, setTime] = useState("no time");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value.trim();

    const valid = val.includes(" ") ? is_valid_fen(val) : is_valid_layout(val);

    // const valid = is_valid_layout(e.target.value);
    if (valid.error) setLayoutError(valid.error);
    else {
      setLayoutError("");
      setCustomLayout(val);
    }
  };

  return (
    <Stack alignItems="center" spacing={2} mb={4}>
      <Typography variant="h3">Board</Typography>
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
            label="Paste layout or FEN"
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
      <Button
        sx={{ width: "50%" }}
        size="large"
        color="secondary"
        variant="contained"
      >
        Create Game
      </Button>
      {/* <Typography variant="h3">Time control</Typography> */}
      {/* <ButtonGroup */}
      {/*   variant="outlined" */}
      {/*   color="primary" */}
      {/*   size="large" */}
      {/*   sx={{ width: "100%" }} */}
      {/* > */}
      {/*   <Button sx={{ width: "25%", paddingLeft: 0, paddingRight: 0 }}> */}
      {/*     5 + 3 */}
      {/*   </Button> */}
      {/*   <Button sx={{ width: "25%", paddingLeft: 0, paddingRight: 0 }}> */}
      {/*     10 + 0 */}
      {/*   </Button> */}
      {/*   <Button */}
      {/*     sx={{ */}
      {/*       width: "25%", */}
      {/*       paddingLeft: 0, */}
      {/*       paddingRight: 0, */}
      {/*     }} */}
      {/*   > */}
      {/*     no time */}
      {/*   </Button> */}
      {/*   <Button sx={{ width: "25%", paddingLeft: 0, paddingRight: 0 }}> */}
      {/*     other */}
      {/*   </Button> */}
      {/* </ButtonGroup> */}
      {/* <Typography variant="h4" component="h4"> */}
      {/*   {time} */}
      {/* </Typography> */}
    </Stack>
  );
};
