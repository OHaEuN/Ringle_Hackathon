import React, { useContext, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import WordsInsideCard from "./WordsInsideCard";
import Box from "@mui/material/Box";
import { AppContext } from "../../pages/Home";

export default function WordCard() {
  const { ContextSynonyms, setContextSynonyms } = useContext(AppContext);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedSynonyms, setSynonyms] = useState([]);

  useEffect(() => {
    setSelectedWord(ContextSynonyms.selected_word);
    setSynonyms(ContextSynonyms.synonyms);
    console.log(selectedSynonyms);
  }, [ContextSynonyms]);

  const VADword = {
    selected_word: selectedWord,
    synonyms: selectedSynonyms,
  };

  const wordList = [
    {
      selected_word: "consider",
      synonyms: ["consider", "guess", "comprehend", "feel"],
    },
    {
      selected_word: "guess",
      synonyms: ["consider", "guess", "comprehend", "feel"],
    },
    {
      selected_word: "comprehend",
      synonyms: ["consider", "guess", "comprehend", "feel"],
    },
    // {
    //   word: "comprehend",
    //   others: [
    //     "consider",
    //     "guess",
    //     "comprehend",
    //     "feel",
    //     "my opinion is",
    //     "from my point of view",
    //   ],
    // },
    // {
    //   word: "comprehend",
    //   others: [
    //     "consider",
    //     "guess",
    //     "comprehend",
    //     "feel",
    //     "my opinion is",
    //     "from my point of view",
    //   ],
    // },
    // {
    //   word: "comprehend",
    //   others: [
    //     "consider",
    //     "guess",
    //     "comprehend",
    //     "feel",
    //     "my opinion is",
    //     "from my point of view",
    //   ],
    // },
    // {
    //   word: "comprehend",
    //   others: [
    //     "consider",
    //     "guess",
    //     "comprehend",
    //     "feel",
    //     "my opinion is",
    //     "from my point of view",
    //   ],
    // },
    // {
    //   word: "comprehend",
    //   others: [
    //     "consider",
    //     "guess",
    //     "comprehend",
    //     "feel",
    //     "my opinion is",
    //     "from my point of view",
    //   ],
    // },
    // {
    //   word: "comprehend",
    //   others: [
    //     "consider",
    //     "guess",
    //     "comprehend",
    //     "feel",
    //     "my opinion is",
    //     "from my point of view",
    //   ],
    // },
  ];

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CardContent sx={{ overflow: "scroll" }}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
            }}
          >
            <WordsInsideCard word={VADword} />
            {wordList.map((item) => {
              return <WordsInsideCard word={item} key={item.selected_word} />;
            })}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
