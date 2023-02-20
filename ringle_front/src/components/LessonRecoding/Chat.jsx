import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarImg from "../../assets/avatar.jpeg";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Slider from "@mui/material/Slider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import { useSynonymsApi } from "../../hooks/Word";
import { AppContext } from "../../pages/Home";

function TeachersChat({ content, time }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={AvatarImg} sx={{ width: 36, height: 36 }} />
      <WhiteChatBox>{content}</WhiteChatBox>
      <div
        style={{ fontSize: "0.725rem", alignSelf: "end", marginLeft: "10px" }}
      >
        {time}
      </div>
    </Stack>
  );
}

function StudentsChat({ content, time }) {
  return (
    <Stack direction="row-reverse" spacing={0} mb="20px" mt="20px">
      <PurpleChatBox>{content}</PurpleChatBox>
      <div
        style={{ fontSize: "0.725rem", alignSelf: "end", marginRight: "-10px" }}
      >
        {time}
      </div>
    </Stack>
  );
}

const WhiteChatBox = styled(Box)`
  border-radius: 10px;
  padding: 5px 20px;
  max-width: 75%;
  margin-left: 20px;
  border: 1px solid #d1d1d1;
  color: #514082;
`;
const PurpleChatBox = styled(Box)`
  background-color: #9a80e5;
  color: #fff;
  border-radius: 10px;
  padding: 5px 20px;
  max-width: 75%;
  margin-left: 20px;
  display: flex;
  justify-self: right;
`;

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 10,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function Chat() {
  const [sentence, setSentence] = useState("she has problem.");
  const [synonyms, setSynonyms] = useState({});
  const [chat, setChat] = useState("");
  const {
    ContextSynonyms,
    setContextSynonyms,
    ContextSentence,
    setContextSentence,
  } = useContext(AppContext);

  const HandleSubmit = async () => {
    const res = await axios.get(
      `http://localhost:8000/word?sentence=${sentence}`
    );
    setSynonyms(res.data);
    setChat(sentence);
  };

  useEffect(() => {
    setContextSynonyms(synonyms);
    setContextSentence(sentence);
    console.log("set");
  }, [synonyms]);

  return (
    <div
      style={{
        width: "65%",
        margin: "30px 50px 0px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "0",
          width: "90%",
          padding: "5px 0",
          marginBottom: "40px",
        }}
      >
        <div style={{ fontWeight: "700", marginLeft: "30px" }}>
          Lesson Recording
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: "700",
              fontSize: "0.9rem",
              marginRight: "10px",
              color: "#767676",
            }}
          >
            Auto Scroll
          </div>
          <FormControlLabel control={<StyledSwitch defaultChecked />} />
        </div>
      </Card>
      <div>
        <TeachersChat
          content="You mentoned that Netflix's content is quite popular. Could you please
        explain why you think they are popular?"
          time="03:42"
        />
        <StudentsChat
          content={`Netflix's content is unique. Customers can only watch them on Netflix,
          so I believe that is the primary reason for its popularity.`}
          time="03:44"
        />
        <TeachersChat
          time="03:45"
          content="We can say these shows and movies are exclusive to the Netflix streaming platform which boosts their media popularity. Does that make sense?"
        />
        <StudentsChat content="Yes" time="03:45" />
        <TeachersChat
          content={`Awesome."Customer-friendly" is an easier phrase that we can use.
        Could you elaborate on the features they might make?`}
          time="03:46"
        />
        <StudentsChat
          content={`Sure. Other broadcasting channels, such as television, do not provide
          customer-friendly services such as personalized suggestions. However,
          Netflix has recommendation algorithms,which I believe is a new feature
          for broadcast channels.`}
          time="03:48"
        />
        <TeachersChat
          time="03:50"
          content="Got it, We can say, unlike cable services, Netflix offers personalized movie and television show recommendations to its subscribers."
        />
        {chat === "" ? (
          <Stack direction="row-reverse" spacing={0} mb="20px" mt="20px">
            <PurpleChatBox sx={{ width: "75%" }}>
              <TextField
                id="filled-textarea"
                label="Continue the conversation"
                placeholder="분석할 내용을 입력하세요."
                multiline
                color="bar"
                variant="filled"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pb: "15px" }}>
                      <IconButton
                        aria-label="submit"
                        edge="end"
                        onClick={HandleSubmit}
                      >
                        <SendIcon color="bar" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSentence(e.target.value)}
              />
            </PurpleChatBox>
          </Stack>
        ) : (
          <StudentsChat content={chat} time="03:52" />
        )}
      </div>

      <Slider aria-label="Playtime" defaultValue={40} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Replay10Icon color="primary" sx={{ fontSize: "2.5rem" }} />
        <PlayCircleOutlineIcon
          color="primary"
          sx={{ fontSize: "4rem", margin: "20px" }}
        />
        <Forward10Icon color="primary" sx={{ fontSize: "2.5rem" }} />
      </Box>
    </div>
  );
}
