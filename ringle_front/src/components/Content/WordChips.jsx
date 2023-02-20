import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import CheckIcon from "@mui/icons-material/Check";
import EastIcon from "@mui/icons-material/East";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";

const StyledDiv = styled.div`
  background-color: #e8e8e8;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
`;

const Highlight = styled.div`
  background-color: #948ad663;
  width: auto;
  margin: 0 6px;
  height: 35px;
`;

export default function WordChips({ sentence, words, synonymSentences }) {
  const [clickedWord, setWord] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const values = [
    "Feeling tense, uneasy, or on edge.",
    "Having a feeling of worry, unease, or dread about something with an uncertain outcome.",
    "Feeling worried or uneasy about something that might happen.",
    "Feeling fear or terror in response to a real or perceived danger.",
    "Filled with fear; very scared and anxious about something.",
  ];
  const newsentence = sentence.replace(words.selected_word, "@");
  const sentencearray = newsentence.split("@");

  const Fetchforexample = async (word) => {
    const res = await axios.get(`http://localhost:8000/word/example?w=${word}`);
  };

  // const FetchforSetnecevad = async () => {
  //   const res = await axios.get(`http://localhost:8000/data/vad`);
  //   console.log(res);
  // };

  const wordList = [
    {
      word: words.selected_word,
      meaning: "두려운",
      tone: values[0],
      example: `I was feeling very nervous before my job interview.`,
    },
    ,
    {
      word: words.synonyms[0],
      meaning: "염려하는, 걱정하는",
      tone: values[1],
      example: `I am feeling anxious about my upcoming exam.`,
    },
    {
      word: words.synonyms[1],
      meaning: "걱정하는, 두려워하는",
      tone: values[2],
      example: `I was apprehensive about starting a new job.`,
    },
    {
      word: words.synonyms[2],
      meaning: "겁먹은",
      tone: values[3],
      example: `I was scared when I heard the loud noise.`,
    },
    {
      word: words.synonyms[3],
      meaning: "공포스러운",
      tone: values[4],
      example: `The child was fearful of the dark.`,
    },
  ];

  function StyledChip({ word }) {
    return (
      <Chip
        label={word}
        variant="outlined"
        color="primary"
        key={word}
        sx={{ color: "#000" }}
        onClick={(e) => {
          const newWord = e.target.textContent;
          const list = wordList.filter((e) => e.word === newWord);
          setWord(list[0]);
          Fetchforexample(list[0].word);
          setIsVisible(true);
        }}
      />
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          fontSize: "1.5rem",
          marginBottom: "15px",
        }}
      >
        {sentencearray[0]}
        <Highlight>{words.selected_word}</Highlight>
        {sentencearray[1]}
      </div>

      <Stack direction="row" spacing={0.6}>
        {wordList.map((item) => {
          return <StyledChip word={item.word} key={item.meaning} />;
        })}
      </Stack>
      <CheckIcon
        color="primary"
        sx={{ position: "absolute", marginTop: "-42px", marginLeft: "79px" }}
      />
      {isVisible ? (
        <StyledDiv>
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontSize: "1.25rem",
                color: "#4130A4",
                fontWeight: "700",
              }}
            >
              {clickedWord.word}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#4130A4",
                fontWeight: "400",
                lineHeight: "2.5",
                marginLeft: "10px",
              }}
            >
              {clickedWord.meaning}
            </div>
          </div>
          <div style={{ marginLeft: "20px", marginTop: "8px" }}>
            <div>{clickedWord.tone}</div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  color: "#4130A4",
                  fontWeight: "700",
                }}
              >
                <SubdirectoryArrowRightIcon />
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#4130A4",
                  fontWeight: "400",
                  lineHeight: "2.5",
                  marginLeft: "10px",
                }}
              >
                {clickedWord.example}
              </div>
            </div>
          </div>
          {/* <div onClick={FetchforSetnecevad}>button</div> */}
        </StyledDiv>
      ) : null}
    </>
  );
}
