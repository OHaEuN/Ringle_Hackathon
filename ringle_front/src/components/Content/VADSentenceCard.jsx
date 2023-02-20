import React, { useContext, useState, useEffect } from "react";
import WordChips from "./WordChips";
import Card from "@mui/material/Card";
import axios from "axios";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { AppContext } from "../../pages/Home";
import VADCard from "../VADCard";
import EastIcon from "@mui/icons-material/East";
import SetenceAnalyseCard from "../SetenceAnalyseCard";

export default function VADSentenceCard() {
  const { ContextSynonyms, setContextSynonyms, ContextSentence } =
    useContext(AppContext);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedSynonyms, setSynonyms] = useState([]);
  const [synonymVAD, setSynonymsVAD] = useState({});
  const [SentenceWord, setSentenceWord] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isVADVisible, setIsVADVisible] = useState(false);
  const handleVADOpen = () => setIsVADVisible(true);
  const handleVADClose = () => setIsVADVisible(false);

  const HandleVADButton = async () => {
    const res = await axios.get(
      `http://localhost:8000/word/detail?w=${selectedWord}&s1=${selectedSynonyms[0]}&s2=${selectedSynonyms[1]}&s3=${selectedSynonyms[2]}&s4=${selectedSynonyms[3]}`
      // `http://localhost:8000/word/detail?w=Problem&s1=challenge&s2=difficulty&s3=obstacle&s4=predicament`
    );

    setSynonymsVAD(res.data);
    handleOpen();
  };

  useEffect(() => {
    setSelectedWord(ContextSynonyms.selected_word);
    setSynonyms(ContextSynonyms.synonyms);
  }, [ContextSynonyms]);

  const VADword = {
    selected_word: selectedWord,
    synonyms: selectedSynonyms,
  };

  return (
    <>
      <Card
        sx={{
          width: "90%",
          margin: "30px auto 50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CardContent>
          <WordChips
            sentence={ContextSentence}
            words={VADword}
            synonymSentences={synonymVAD}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="small" onClick={HandleVADButton}>
            Learn More
          </Button>
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#4130A4",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
            >
              Sentence Analysis
            </div>
            <IconButton onClick={handleVADOpen}>
              <EastIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            width: "60%",
            margin: "20px auto",

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
              어휘별 뉘앙스 차이 분석
            </div>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <VADCard synonymsVAD={synonymVAD} />
        </Card>
      </Modal>
      <Modal open={isVADVisible} onClose={handleVADClose}>
        <Card
          sx={{
            width: "60%",
            margin: "20px auto",
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
            <IconButton onClick={handleVADClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <SetenceAnalyseCard />
        </Card>
      </Modal>
    </>
  );
}
