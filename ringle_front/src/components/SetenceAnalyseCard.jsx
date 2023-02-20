import React from "react";
import Card from "@mui/material/Card";
import VADChart from "./VADChart";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function SetenceAnalyseCard() {
  return (
    <>
      <Card
        sx={{
          width: "70%",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          paddingBottom: "20px",
        }}
      >
        <div style={{ margin: "20px" }}>
          <div> 긍정: 높을수록 긍정적인 느낌이에요! </div>
          <div> 강렬: 높을수록 더 강렬하거나 흥분된 느낌이에요!</div>
          <div> 통제: 낮을수록 통제하기 어려운 느낌이에요!</div>
        </div>
        <VADChart
          title="어휘 대체에 따른 문장 느낌 분석"
          chartLabels={["긍정", "강렬", "통제"]}
          chartData={[
            {
              name: "Nervous",
              type: "column",
              fill: "solid",

              data: [1.8 * 2, 3.5 * 2, 2.7 * 2],
            },
            {
              name: "Anxious",
              type: "column",
              fill: "gradient",
              data: [2.6 * 2, 3.5 * 2, 2.8 * 2],
            },
          ]}
        />

        <div style={{ display: "flex", marginLeft: "20px" }}>
          I'm feeling very
          <div
            style={{ fontWeight: "600", color: "#400b85", margin: "0 10px" }}
          >
            nervous
          </div>{" "}
          about an upcoming job interview I have.
        </div>
        <div style={{ display: "flex", marginLeft: "20px" }}>
          I'm feeling very{" "}
          <div
            style={{ fontWeight: "600", color: "#8e8e8e", margin: "0 10px" }}
          >
            anxious
          </div>{" "}
          about an upcoming job interview I have.
        </div>
      </Card>
    </>
  );
}
