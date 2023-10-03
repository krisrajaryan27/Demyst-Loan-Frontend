import * as React from "react";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";

const Outcome = () => {
  const location = useLocation();
  const { message } = location.state;

  return (
    <div>
      <Paper
        sx={{
          width: "50%",
          marginX: "auto",
          marginTop: "50px",
          padding: "16px",
        }}
      >
        <div>{message}</div>
      </Paper>
    </div>
  );
};

export default Outcome;
