import React from "react";
import Chip from "@mui/material/Chip";

export default function StyledChip({ word }) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Chip
        label={word}
        variant="outlined"
        color="chip"
        sx={{ color: "#9c7ff1", fontWeight: "600" }}
      />
    </div>
  );
}
