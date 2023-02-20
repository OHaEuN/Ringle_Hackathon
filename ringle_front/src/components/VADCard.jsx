import React from "react";
import Card from "@mui/material/Card";
import VADChart from "./VADChart";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTabs = styled((props) => (
  <Tabs
    variant="scrollable"
    scrollButtons={false}
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 30,
    width: "100%",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 600,
    padding: "5px 15px 5px",
    fontSize: theme.typography.pxToRem(15),
  })
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function VADCard({ synonymsVAD }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { selected_word, scores, nuance } = synonymsVAD;
  const nuances = nuance[0];
  const keys = Object.keys(nuances);
  const values = [];
  for (let i = 0; i < keys.length; i++) {
    values.push(nuances[keys[i]]);
    if (scores[i] === null) {
      scores[i] = { Vocab: keys[i + 1], V_score: 0, A_score: 0, D_score: 0 };
    }
  }

  return (
    <>
      <Card
        sx={{
          width: "80%",
          margin: "30px auto",
          maxHeight: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          paddingBottom: "20px",
          overflow: "scroll",
        }}
      >
        {/* <div style={{ margin: "20px" }}>
          <div> 긍정: 높을수록 긍정적인 느낌이에요! </div>
          <div> 강렬: 높을수록 더 강렬하거나 흥분된 느낌이에요!</div>
          <div> 통제: 낮을수록 통제하기 어려운 느낌이에요!</div>
        </div> */}
        <VADChart
          title="어휘에 따른 뉘앙스 차이 분석"
          subheader="긍정: 높을수록 긍정적인 느낌이에요!
          강렬: 높을수록 더 강렬하거나 흥분된 느낌이에요!
          통제: 낮을수록 통제하기 어려운 느낌이에요!"
          chartLabels={[
            selected_word.Vocab,
            scores[0].Vocab,
            scores[1].Vocab,
            scores[2].Vocab,
            scores[3].Vocab,
          ]}
          chartData={[
            {
              name: "긍정",
              type: "column",
              fill: "solid",
              data: [
                selected_word.V_score,
                scores[0].V_score,
                scores[1].V_score,
                scores[2].V_score,
                scores[3].V_score,
              ],
            },
            {
              name: "강렬",
              type: "column",
              fill: "gradient",
              data: [
                selected_word.A_score,
                scores[0].A_score,
                scores[1].A_score,
                scores[2].A_score,
                scores[3].A_score,
              ],
            },
            {
              name: "통제",
              type: "column",
              fill: "solid",
              data: [
                selected_word.D_score,
                scores[0].D_score,
                scores[1].D_score,
                scores[2].D_score,
                scores[3].D_score,
              ],
            },
          ]}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                width: "100%",
                padding: "0 8px",
              }}
            >
              <StyledTab label={keys[0]} {...a11yProps(0)} />
              <StyledTab label={keys[1]} {...a11yProps(1)} />
              <StyledTab label={keys[2]} {...a11yProps(2)} />
              <StyledTab label={keys[3]} {...a11yProps(3)} />
              <StyledTab label={keys[4]} {...a11yProps(4)} />
            </StyledTabs>
          </Box>
          <TabPanel value={value} index={0}>
            {values[0]}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {values[1]}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {values[2]}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {values[3]}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {values[4]}
          </TabPanel>
          <div>
            단어장에 추가하기
            <IconButton aria-label="delete" onClick={handleClick}>
              <AddCircleRoundedIcon color="primary" />
            </IconButton>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", marginLeft: "750px", marginBottom: "18px" }}
          >
            단어장에 추가되었습니다!
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
}
