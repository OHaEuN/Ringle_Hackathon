import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import StyledChip from "../common/StyledChip";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import VADCard from "../VADCard";
import VADSentenceCard from "../Content/VADSentenceCard";

export default function WordsInsideCard({ word }) {
  const [synonymVAD, setSynonymsVAD] = useState({});
  const [SentenceWord, setSentenceWord] = useState("");
  const [open, setOpen] = React.useState(false);
  const [VADSetnceOpen, setVADSentenceOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleVADSentenceOpen = () => setVADSentenceOpen(true);
  const handleVADSentenceClose = () => setVADSentenceOpen(false);

  const HandleVADButton = async () => {
    const res = await axios.get(
      // `http://localhost:8000/word/detail?w=${word.selected_word}&s1=${word.synonyms[0]}&s2=${word.synonyms[1]}&s3=${word.synonyms[2]}&s4=${word.synonyms[3]}`
      `http://localhost:8000/word/detail?w=Problem&s1=challenge&s2=difficulty&s3=obstacle&s4=predicament`
    );
    console.log(res);
    setSynonymsVAD(res.data);
    handleOpen();
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardHeader title={word.selected_word && word.selected_word} />

        <CardContent>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
            {word.synonyms &&
              word.synonyms.map((w) => {
                return (
                  <div
                    onClick={() => {
                      setSentenceWord(w);
                      handleVADSentenceOpen();
                    }}
                  >
                    <StyledChip word={w} key={w} />
                  </div>
                );
              })}
          </Stack>
        </CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={HandleVADButton}
            sx={{ marginRight: "15px" }}
            variant="outlined"
          >
            어휘별 VAD
          </Button>
          <Button
            onClick={HandleVADButton}
            sx={{ marginRight: "15px" }}
            variant="outlined"
          >
            어휘별 예문
          </Button>
        </div>
      </Card>
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
            paddingBottom: "20px",
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
              어휘별 뉘앙스 차이 분석
            </div>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <VADCard synonymsVAD={synonymVAD} />
        </Card>
      </Modal>
      <Modal open={VADSetnceOpen} onClose={handleVADSentenceClose}>
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
              선택된 어휘의 예문
            </div>
            <IconButton onClick={handleVADSentenceClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <VADSentenceCard word={SentenceWord} />
        </Card>
      </Modal>
    </>
  );
}
