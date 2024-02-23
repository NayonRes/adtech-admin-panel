import React, { useContext, useState } from "react";
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
import {
  Avatar,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Objective from "./Objective";
import Budget from "./Budget";
import GenderAndAge from "./GenderAndAge";
import Location from "./Location";
import PulseLoader from "react-spinners/PulseLoader";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
const AutoPlaySwipeableViews = SwipeableViews;

function MySlider() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [promotion, setPromotion] = useState("");
  const [amount, setAmount] = useState(1000);
  const [gender, setGender] = useState("");
  const [min_age, setMin_age] = useState(18);
  const [max_age, setMax_age] = useState(18);
  const [location, setLocation] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [promotion_period, setPromotion_period] = useState(5);
  const [promotion_objective, setPromotion_objective] = useState("");
  const [postLink, setPostLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [messageMedia, setMessageMedia] = useState([]);
  const [leadItems, setLeadItems] = useState([]);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
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
      link={link}
      setLink={setLink}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
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
  const handleClickOpen = () => {
    if (divisions.length < 1 && activeStep === 4) {
      handleSnakbarOpen("Please select location", "error");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
    } else if (promotion === "Google") {
      if (link.trim().length < 1) {
        handleSnakbarOpen("Please enter link", "error");
        document.getElementById("link").focus();
        disabled = true;
      } else if (title.trim().length < 1) {
        handleSnakbarOpen("Please enter title", "error");
        document.getElementById("title").focus();
        disabled = true;
      } else if (description.trim().length < 1) {
        handleSnakbarOpen("Please enter description", "error");
        document.getElementById("description").focus();
        disabled = true;
      }
    } else if (promotion === "Youtube") {
      if (videoLink.trim().length < 1) {
        handleSnakbarOpen("Please enter video link", "error");
        document.getElementById("videoLink").focus();
        disabled = true;
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
  const handleResetForm = () => {
    setPromotion("");
    setPromotion_objective("");
    setPostLink("");
    setWebsiteLink("");
    setVideoLink("");
    setLeadItems([]);
    setMessageMedia([]);

    setLink("");
    setTitle("");
    setDescription("");

    setMin_age(18);
    setMax_age(18);

    setAmount(1000);
    setPromotion_period(5);
    setGender("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let err = validation();
    // let err = false;
    setErrors({});

    // if (err) {
    //   return;
    // } else {
    setLoading(true);
    try {
      let myObectives = [];
      if (messageMedia.length > 0) {
        messageMedia.map((item) => {
          myObectives.push({ media: item });
        });
      }
      if (leadItems.length > 0) {
        leadItems.map((item) => {
          myObectives.push({ lead: item });
        });
      }
      if (postLink.trim().length > 0) {
        myObectives.push({ post_link: postLink });
      }
      if (videoLink.trim().length > 0) {
        myObectives.push({ video_link: videoLink });
      }
      if (websiteLink.trim().length > 0) {
        myObectives.push({ website_link: websiteLink });
      }
      if (link.trim().length > 0) {
        myObectives.push({ link: link });
      }
      if (title.trim().length > 0) {
        myObectives.push({ title: title });
      }
      if (description.trim().length > 0) {
        myObectives.push({ description: description });
      }

      let data = {
        promotion: promotion,
        gender: gender,
        min_age: min_age,
        max_age: max_age,
        amount: amount,
        promotion_period: promotion_period,
        promotion_objective: promotion_objective,
        divisions: divisions,
        objectives: myObectives,
        // status: "Active",
      };
      let response = await axios({
        url: "/api/order",
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${adtech_admin_panel.token}`,
        },
      });

      if (response?.status > 199 && response?.status < 300) {
        handleSnakbarOpen("Successful", "success");
        handleClose();
        handleResetForm();
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        logout();
        return;
      }
      if (error?.response?.status === 500) {
        handleSnakbarOpen(error?.response?.statusText, "error");
      } else {
        setErrors(error.response.data.errors);
      }
      // handleSnakbarOpen(error.response.data.messages.toString(), "error");
      // if (error.response.data.errors.length < 1) {
      //   handleSnakbarOpen("Something went wrong", "error");
      // }
    }
    setLoading(false);
    // }
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
              size="small"
              disableElevation
              variant="contained"
              onClick={handleClickOpen}
            >
              &nbsp;&nbsp; Continue &nbsp;&nbsp;
              {/* {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )} */}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        sx={{ ".MuiDialog-paper": { p: 3 } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontWeight: 600, position: "relative" }}
        >
          {/* {"Order Details"}{" "}
          <IconButton
            sx={{ position: "absolute", right: 0, top: -10 }}
            onClick={handleClose}
          >
            <ClearOutlinedIcon />
          </IconButton> */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs="auto">
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs="auto">
                  {" "}
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: `${theme.palette.primary.light}`,
                    }}
                  >
                    <ListAltOutlinedIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "18px",
                      }}
                    />
                  </Avatar>
                </Grid>
                <Grid item xs="auto">
                  <Typography
                    variant="base"
                    color="text.main"
                    sx={{ fontWeight: 500 }}
                  >
                    Order Details
                  </Typography>

                  {/* <Breadcrumbs
                  aria-label="breadcrumb"
                  // className={classes.breadcrumbsStyle}
                >
                  <Link to="/">Home</Link>
                  <Link to="/">Users</Link>
                  <Link to="#">List of Users</Link>
                </Breadcrumbs> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="auto" sx={{ textAlign: "right" }}>
              <IconButton
                // sx={{ position: "absolute", right: 0, top: -10 }}
                onClick={handleClose}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ minWidth: "350px" }}>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Boost Item: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {promotion}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Boost Objective: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {promotion_objective}
              </span>
            </Typography>
            {messageMedia.length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Message Media: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {messageMedia.toString()}
                </span>
              </Typography>
            )}
            {leadItems.length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Lead Items: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {leadItems.toString()}
                </span>
              </Typography>
            )}
            {postLink.trim().length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Post Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {postLink}
                </span>
              </Typography>
            )}
            {videoLink.trim().length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Video Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {videoLink}
                </span>
              </Typography>
            )}
            {websiteLink.trim().length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Website Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {websiteLink}
                </span>
              </Typography>
            )}
            {link.trim().length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>{link}</span>
              </Typography>
            )}
            {title.trim().length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Title: &nbsp;
                <span style={{ color: theme.palette.text.main }}>{title}</span>
              </Typography>
            )}
            {description.trim().length > 0 && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Description: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {description}
                </span>
              </Typography>
            )}

            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Package Amount: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                TK. {amount}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Boosting Period: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {promotion_period} Day{parseInt(promotion_period) > 1 && "s"}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Gender: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {gender} {gender === "Both" && "(Male and Female)"}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Age: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {min_age} To {max_age} Years
              </span>
            </Typography>
            <Table>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ p: 0, width: "75px" }}>
                    {" "}
                    <Typography variant="base" color="text.light">
                      {" "}
                      Location: &nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    {" "}
                    <Typography variant="base" color="text.main">
                      {divisions.toString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 0, pb: 1.5, justifyContent: "center" }}>
          <Button
            variant="contained"
            disableElevation
            // size="small"
            style={{
              minHeight: "37px",
              minWidth: "180px",
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
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MySlider;
