import { Button, ButtonGroup, Divider, Stack, Typography } from "@mui/material";

export const CreateGame = () => {
  return (
    <Stack alignItems="center" spacing={2}>
      <Typography>Board</Typography>
      <ButtonGroup
        variant="outlined"
        color="primary"
        size="large"
        sx={{ width: "100%" }}
      >
        <Button sx={{ width: "25%" }}>6x6</Button>
        <Button sx={{ width: "25%" }}>8x8</Button>
        <Button sx={{ width: "25%" }}>10x10</Button>
        <Button sx={{ width: "25%" }}>Custom</Button>
      </ButtonGroup>
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
