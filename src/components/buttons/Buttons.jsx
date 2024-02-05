import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const Buttons = () => {
  return (
    <Paper sx={{p:3}}>
      {" "}
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </Paper>
  );
};

export default Buttons;
