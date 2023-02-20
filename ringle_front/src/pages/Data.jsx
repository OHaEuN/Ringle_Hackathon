import React, { useState } from "react";
import AppBar from "../components/common/AppBar";
import img from "../assets/screen.png";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Data() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const words = [
    ["Abundant", "plentiful", 3],
    ["Benevolent", "kind", 5],
    ["Cogent", "convincing", 2],
    ["Diverse", 5],
    ["Eloquent", "expressive", 10],
    ["Frugal", "economical", 4],
    ["Garrulous", "talkative", 2],
    ["Hapless", "unlucky", 6],
    ["Inevitable", 4],
    ["Jovial", "cheerful", 2],
  ];

  function AnalysisCard({ content }) {
    return (
      <Card
        sx={{
          width: "358px",
          height: "63px",
          padding: "20px 10px",
          fontWeight: "500",
          fontSize: "0.85rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginRight: "10px",
        }}
      >
        {content}
        <KeyboardArrowRightIcon sx={{ height: "15px" }} />
      </Card>
    );
  }

  return (
    <>
      <AppBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={img} style={{ width: "65%", marginTop: "80px" }} />
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div onClick={handleOpen}>
            <AnalysisCard content="Ringle Voca" />
          </div>
          <div onClick={handleOpen2}>
            <AnalysisCard content="이번달 새로 학습한 단어 (10개)" />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            width: "40%",
            margin: "100px auto",
            maxHeight: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 10px 20px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#4130A4",
              }}
            >
              Rigle Voca
            </div>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            {words.map((word) => (
              <Card
                sx={{
                  display: "flex",
                  padding: "35px 30px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  {word[0]}
                </div>
                {word.length > 2 ? (
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px", color: "#9a80e5" }}>
                      my word:
                    </div>
                    <div style={{ color: "#525252" }}>{word[1]}</div>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </Card>
      </Modal>
      <Modal open={open2} onClose={handleClose2}>
        <Card
          sx={{
            width: "40%",
            margin: "50px auto",
            maxHeight: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 10px 20px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#4130A4",
              }}
            >
              이번달 새로 학습한 단어 (10개)
            </div>
            <IconButton onClick={handleClose2}>
              <CloseIcon />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            {words.map((word) => (
              <Card
                sx={{
                  display: "flex",
                  padding: "35px 30px",
                  verticalAlign: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                  {word[0]}
                </div>
                <div style={{ marginRight: "10px", color: "#9a80e5" }}>
                  {word[word.length - 1]}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Modal>
    </>
  );
}
