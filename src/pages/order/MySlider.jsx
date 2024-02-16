import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import BoostItems from "./BoostItems";
import { Grid } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Objective from "./Objective";
import Budget from "./Budget";
import GenderAndAge from "./GenderAndAge";
import Location from "./Location";
import PulseLoader from "react-spinners/PulseLoader";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useSnackbar } from "notistack";

const AutoPlaySwipeableViews = SwipeableViews;

function MySlider({
  loading,
  handleSubmit,
  promotion,
  setPromotion,
  promotion_objective,
  setPromotion_objective,
  postLink,
  setPostLink,
  websiteLink,
  setWebsiteLink,
  videoLink,
  setVideoLink,
  amount,
  setAmount,
  promotion_period,
  setPromotion_period,

  gender,
  setGender,
  min_age,
  setMin_age,
  max_age,
  setMax_age,

  location,
  setLocation,
  divisions,
  setDivisions,

  messageMedia,
  setMessageMedia,
  leadItems,
  setLeadItems,
}) {
  const forms = [
    <BoostItems promotion={promotion} setPromotion={setPromotion} />,
    <Objective
    promotion={promotion}
      promotion_objective={promotion_objective}
      setPromotion_objective={setPromotion_objective}
      postLink={postLink}
      setPostLink={setPostLink}
      websiteLink={websiteLink}
      setWebsiteLink={setWebsiteLink}
      videoLink={videoLink}
      setVideoLink={setVideoLink}
      messageMedia={messageMedia}
      setMessageMedia={setMessageMedia}
      leadItems={leadItems}
      setLeadItems={setLeadItems}
    />,
    <Budget
      setVideoLink={setVideoLink}
      amount={amount}
      setAmount={setAmount}
      promotion_period={promotion_period}
      setPromotion_period={setPromotion_period}
    />,
    <GenderAndAge
      gender={gender}
      setGender={setGender}
      min_age={min_age}
      setMin_age={setMin_age}
      max_age={max_age}
      setMax_age={setMax_age}
    />,
    <Location
      location={location}
      setLocation={setLocation}
      divisions={divisions}
      setDivisions={setDivisions}
    />,
  ];
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = forms.length;
  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };
  const disable2ndNextButton = () => {
    let disabled = false;
    if (promotion === "Facebook") {
      if (promotion_objective.trim().length < 1) {
        handleSnakbarOpen("Please select a obective", "error");
        disabled = true;
      }
      if (promotion_objective === "Message") {
        if (messageMedia.length < 1) {
          handleSnakbarOpen("Please select your message media", "error");
          disabled = true;
        } else if (postLink.trim().length < 1) {
          handleSnakbarOpen("Please enter post link", "error");
          document.getElementById("postLink").focus();
          disabled = true;
        }
      }
      if (promotion_objective === "Traffic") {
        if (postLink.trim().length < 1) {
          handleSnakbarOpen("Please enter post link", "error");
          document.getElementById("postLink").focus();
          disabled = true;
        } else if (websiteLink.trim().length < 1) {
          handleSnakbarOpen("Please enter website link", "error");
          document.getElementById("websiteLinkforTrafficObective").focus();
          disabled = true;
        }
      }
      if (promotion_objective === "Engagement" && postLink.trim().length < 1) {
        handleSnakbarOpen("Please enter post link", "error");
        document.getElementById("postLink").focus();
        disabled = true;
      }
      if (promotion_objective === "Leads") {
        if (leadItems.length < 1) {
          handleSnakbarOpen("Please select your lead items", "error");
          disabled = true;
        } else if (postLink.trim().length < 1) {
          handleSnakbarOpen("Please enter post link", "error");
          document.getElementById("postLink").focus();
          disabled = true;
        }
      }

      if (promotion_objective === "Reach") {
        if (postLink.trim().length < 1) {
          handleSnakbarOpen("Please enter post link", "error");
          document.getElementById("postLink").focus();
          disabled = true;
        } else if (videoLink.trim().length < 1) {
          handleSnakbarOpen("Please enter video link", "error");
          document.getElementById("videoLink").focus();
          disabled = true;
        }
      }
    }

    return disabled;
  };

  const handleNext = () => {
    if (promotion.trim().length < 1 && activeStep === 0) {
      handleSnakbarOpen("Please select a boost Item", "error");
      return;
    }
    if (activeStep === 1 && disable2ndNextButton()) {
      return;
    }

    if (gender.trim().length < 1 && activeStep === 3) {
      handleSnakbarOpen("Please select gender", "error");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography sx={{ textAlign: "center", px: 2, py: 4 }}>
          {promotion ? promotion : "Select Your Boost Item"}
        </Typography>
      </Paper> */}
      {promotion === "" && (
        <Typography
          sx={{
            textAlign: "center",
            px: 2,
            py: 2,
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          {promotion ? promotion : "Select Your Boost Item"}
        </Typography>
      )}
      {promotion === "Youtube" && (
        <Box
          sx={{
            fontSize: "20px",
            color: "#222",
            px: 2,
            py: 2,
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item xs="auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                style={{
                  position: "relative",
                  top: "3px",
                }}
              >
                <path
                  fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                ></path>
                <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
              </svg>
            </Grid>
            <Grid item xs="auto">
              You<span style={{ color: "#FF3D00" }}>Tube</span> &nbsp;
              <span style={{ color: "#718096", fontWeight: 200 }}>Boost</span>
            </Grid>
          </Grid>{" "}
        </Box>
      )}
      {promotion === "Google" && (
        <Box
          sx={{
            fontSize: "20px",
            color: "#718096",
            px: 2,
            py: 2,
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item xs="auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                style={{
                  position: "relative",
                  top: "3px",
                }}
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </Grid>
            <Grid item xs="auto">
              Google &nbsp;
              <span style={{ color: "#718096", fontWeight: 200 }}>Boost</span>
            </Grid>
          </Grid>{" "}
        </Box>
      )}
      {promotion === "Facebook" && (
        <Box
          sx={{
            fontSize: "20px",
            color: "#316FF6",
            px: 2,
            py: 2,
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item xs="auto">
              {/* <FacebookOutlinedIcon
                style={{
                  fontSize: "24px",
                  position: "relative",
                  top: "3px",
                }}
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="28"
                height="28"
                viewBox="0 0 48 48"
                style={{
                  position: "relative",
                  top: "3px",
                }}
              >
                <path
                  fill="#039be5"
                  d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                ></path>
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                ></path>
              </svg>
            </Grid>
            <Grid item xs="auto" sx={{ color: "#039be5" }}>
              Facebook&nbsp;
              <span style={{ color: "#718096", fontWeight: 200 }}>Boost</span>
            </Grid>
          </Grid>{" "}
        </Box>
      )}

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        disabled
      >
        {forms.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                // component="img"
                sx={{
                  // height: 255,
                  display: "block",
                  // maxWidth: 400,
                  // overflow: "hidden",
                  width: "100%",
                }}
                // src={step.imgPath}
                // alt={step.label}
              >
                {step}
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ mt: 2, background: "none", boxShadow: "none" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ? (
            <Button
              variant="contained"
              disableElevation
              size="small"
              style={{
                minHeight: "31px",
              }}
              endIcon={
                <SendOutlinedIcon
                  style={{ position: "relative", top: -2, fontSize: "16px" }}
                />
              }
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading === false && <>&nbsp;&nbsp; Confirm</>}
              <PulseLoader
                color={"#353b48"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
            </Button>
          ) : (
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              endIcon={
                <KeyboardArrowRight style={{ position: "relative", top: -1 }} />
              }
            >
              &nbsp;&nbsp; Next
              {/* {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )} */}
            </Button>
          )
        }
        backButton={
          <Button
            disableElevation
            size="small"
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={
              <KeyboardArrowLeft style={{ position: "relative", top: -1 }} />
            }
          >
            {/* {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )} */}
            Back &nbsp;&nbsp;
          </Button>
        }
      />
    </Box>
  );
}

export default MySlider;
