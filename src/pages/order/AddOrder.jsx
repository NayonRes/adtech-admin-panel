import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthContext } from "../../context/AuthContext";
import { getDataWithToken } from "../../services/GetDataService";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MySlider from "./MySlider";

const AddOrder = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  //============================

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

  // ================================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const validation = () => {
    let isError = false;
    // if (!name.trim()) {
    //   handleSnakbarOpen("Please enter user name", "error");
    //   document.getElementById("name").focus();
    //   return (isError = true);
    // }
    // if (!mobileNo.trim()) {
    //   handleSnakbarOpen("Please enter mobile number", "error");
    //   document.getElementById("mobileNo").focus();
    //   return (isError = true);
    // }
    // if (!email.trim()) {
    //   handleSnakbarOpen("Please enter email address", "error");
    //   document.getElementById("email").focus();
    //   return (isError = true);
    // } else if (
    //   !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    //     email
    //   )
    // ) {
    //   handleSnakbarOpen("Invalid email address", "error");
    //   document.getElementById("email").focus();
    //   return (isError = true);
    // }

    // if (!password.trim()) {
    //   handleSnakbarOpen("Please enter password", "error");
    //   document.getElementById("password").focus();
    //   return (isError = true);
    // }
    if (password.trim().length < 8) {
      handleSnakbarOpen(
        "The password field must be at least 8 characters.",
        "error"
      );
      document.getElementById("password").focus();
      return (isError = true);
    }
    if (!confirmPassword.trim()) {
      handleSnakbarOpen("Please enter confirm password", "error");
      document.getElementById("confirmPassword").focus();
      return (isError = true);
    }
    if (password.trim() !== confirmPassword.trim()) {
      handleSnakbarOpen("password and confirm password doesn't match", "error");

      return (isError = true);
    }

    return isError;
  };

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
      if (postLink.length > 0) {
        myObectives.push({ post_link: postLink });
      }
      if (videoLink.length > 0) {
        myObectives.push({ video_link: videoLink });
      }
      if (websiteLink.length > 0) {
        myObectives.push({ website_link: websiteLink });
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
      if (response?.status === 401) {
        logout();
        return;
      }
      if (response?.status > 199 && response?.status < 300) {
        handleSnakbarOpen("Successful", "success");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMobileNo("");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
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
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <form
          style={{
            padding: "50px",
            background: "#fff",
            borderRadius: "10px",
            // textAlign: "center",
            width: "400px",
            // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h5"
            component="div"
            style={{ marginBottom: "10px", textAlign: "center" }}
          >
            Add Order
          </Typography>
          <MySlider
            promotion={promotion}
            setPromotion={setPromotion}
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
            amount={amount}
            setAmount={setAmount}
            promotion_period={promotion_period}
            setPromotion_period={setPromotion_period}
            gender={gender}
            setGender={setGender}
            min_age={min_age}
            setMin_age={setMin_age}
            max_age={max_age}
            setMax_age={setMax_age}
            location={location}
            setLocation={setLocation}
            divisions={divisions}
            setDivisions={setDivisions}
          />

          <Button
            variant="contained"
            disableElevation
            fullWidth
            style={{
              marginBottom: "30px",
              minHeight: "37px",
              marginTop: "18px",
            }}
            disabled={loading}
            // onClick={onSubmit}
            type="submit"
          >
            {loading === false && "Create & Add Another"}
            <PulseLoader
              color={"#353b48"}
              loading={loading}
              size={10}
              speedMultiplier={0.5}
            />{" "}
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default AddOrder;
