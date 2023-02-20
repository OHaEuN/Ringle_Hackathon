import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/ringle-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

export default function RingleAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="bar">
        <Toolbar
          sx={{
            width: "65%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <img
            src={logo}
            alt="ringle_logo"
            onClick={() => {
              navigate("/");
            }}
          />
          <div
            style={{
              width: "195px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                fontWeight: "600",
                width: "90px",
                height: "40px",
              }}
            >
              로그아웃
            </Button>
            <Button
              variant="contained"
              sx={{
                fontWeight: "600",
                width: "90px",
                height: "40px",
              }}
              onClick={() => {
                navigate("/data");
              }}
            >
              내 강의실
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
