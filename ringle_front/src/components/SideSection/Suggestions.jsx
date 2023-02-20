import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import WordCard from "../WordSuggest/WordCard";
import VADSentenceCard from "../Content/VADSentenceCard";

function AnalysisCard({ content }) {
  return (
    <Card
      sx={{
        height: "45px",
        padding: "0px 10px",
        fontWeight: "500",
        fontSize: "0.85rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {content}
      <KeyboardArrowRightIcon sx={{ height: "15px" }} />
    </Card>
  );
}

export default function Suggestions() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        maxWidth: "260px",
        display: "flex",
        flexDirection: "column",
        margin: "0px auto",
      }}
    >
      <Box mb={"15px"}>
        <div
          style={{
            fontWeight: "800",
            margin: "15px 0px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Patterns & Suggestions
          <HelpOutlineRoundedIcon
            sx={{ width: "16px", ml: "3px", color: "#8c8c8c" }}
          />
        </div>
        <div style={{ fontSize: "0.8rem" }}>
          {`You use filler words usage normal. Still, try to remove them
          completely!`}
          <br />
          {`Filler words (words used to mark a pause or hesitation, ex. Hmm,
          like)`}
        </div>
      </Box>
      <div style={{ fontWeight: "800", margin: "15px 0px" }}>
        Speaking Pattern & Suggestions
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "240px",
          justifyContent: "space-around",
        }}
      >
        <AnalysisCard content="CAF Analysis" />
        <AnalysisCard content={`View your expressions (8)`} />
        <AnalysisCard content={`View your words (219)`} />
        <div onClick={handleOpen}>
          <AnalysisCard content="View suggested synonyms" />
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            width: "60%",
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
            <div style={{ fontSize: "1.25rem", fontWeight: "700" }}>
              동의어 추천 및 어휘별 예문
            </div>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {/* <WordCard /> */}
          <VADSentenceCard />
        </Card>
      </Modal>
    </div>
  );
}
