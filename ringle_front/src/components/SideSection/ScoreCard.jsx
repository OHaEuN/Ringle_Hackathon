import React from "react";
import Card from "@mui/material/Card";
import ScoreChart from "./ScoreChart";

export default function ScoreCard({ title }) {
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: "260px",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          boxShadow: "2px 2px 10px 3px #d1d1d1",
          borderRadius: "5%",
        }}
      >
        <ScoreChart
          title={title}
          chartData={[
            { label: "Me", value: 346 },
            { label: "Tutor", value: 575 },
            { label: "Top 20%", value: 432 },
          ]}
        />
      </Card>
    </>
  );
}
