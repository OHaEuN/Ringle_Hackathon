import React, { createContext, useState } from "react";
import AppBar from "../components/common/AppBar";
import VADCard from "../components/VADCard";
import ScoreCard from "../components/SideSection/ScoreCard";
import Chat from "../components/LessonRecoding/Chat";
import Suggestions from "../components/SideSection/Suggestions";

export const AppContext = createContext();

export default function Home() {
  const [ContextSynonyms, setContextSynonyms] = useState({});
  const [ContextSentence, setContextSentence] = useState("");
  return (
    <>
      <AppBar />
      <AppContext.Provider
        value={{
          ContextSynonyms,
          setContextSynonyms,
          ContextSentence,
          setContextSentence,
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            padding: "20px",
            margin: "64px auto",
            alignItems: "start",
          }}
        >
          <Chat />
          <div
            style={{
              flexDirection: "column",
              width: "30%",
            }}
          >
            <ScoreCard title="Speech Pace" />
            <ScoreCard title="Range of Words" />
            <Suggestions />
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}
