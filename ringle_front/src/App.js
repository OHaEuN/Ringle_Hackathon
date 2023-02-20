import React from "react";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./utils/font.css";
import MainPage from "./pages/MainPage";

export const RingleTheme = createTheme({
  palette: {
    primary: {
      main: "#4130A4",
      contrastText: "#fff",
    },
    chip: { main: "#8c8c8c", contrastText: "#8867EC" },
    first: {
      main: "#9a80e5",
      contrastText: "#fff",
    },
    second: {
      main: "#D1D8EC",
      contrastText: "#fff",
    },
    third: {
      main: "#F9CA4F",
      contrastText: "#fff",
    },
    bar: {
      main: "#fff",
      contrastText: "#4130A4",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  components: {
    MuiModal: {
      "&:focus": {
        outline: "none",
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pretendard Std Variable';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={RingleTheme}>
      <CssBaseline />
      <div className="App">
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
