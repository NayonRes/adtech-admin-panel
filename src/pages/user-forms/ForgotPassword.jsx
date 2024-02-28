import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import ForgotPasswordOTPVarify from "./ForgotPasswordOTPVarify";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSection, setEmailSection] = useState(true);
  const [reference, setReference] = useState("");
  const [otpSection, setOtpSection] = useState(false);
  const [passwordSection, setPasswordSection] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

  const validation = () => {
    let isError = false;
    if (!email.trim()) {
      handleSnakbarOpen("Please enter email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      handleSnakbarOpen("Invalid email address", "error");
      document.getElementById("email").focus();

      return (isError = true);
    }

    return isError;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let err = validation();

    if (err) {
      return;
    } else {
      setLoading(true);
      try {
        let data = {
          email,
        };
        let response = await axios({
          url: "/api/auth/user/forgot",
          method: "post",
          data: data,
        });

        if (response?.status > 199 && response?.status < 300) {
          handleSnakbarOpen("OPT has been in your email address", "success");
          setReference(response?.data?.data?.reference);
          setEmailSection(false);
          setOtpSection(true);
        }
      } catch (error) {
        console.log("error", error);
        if (error?.response?.status === 500) {
          handleSnakbarOpen(error?.response?.statusText, "error");
        } else {
          handleSnakbarOpen(error.response.data.messages.toString(), "error");
        }
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {emailSection && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <form
            onSubmit={onSubmit}
            style={{
              padding: "50px",
              background: "#fff",
              borderRadius: "10px",
              textAlign: "center",
              width: "400px",
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <img
              src="/logo.svg"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "155px" }}
            />
            <br />
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "30px" }}
            >
              Verify your identity.
              <span
                style={{
                  display: "block",
                  fontSize: "16px",
                  letterSpacing: "2px",
                  marginTop: "5px",
                }}
              >
                {" "}
                Please enter your email address.
              </span>
            </Typography>

            <TextField
              autoFocus
              id="email"
              placeholder="Enter your email address"
              fullWidth
              size="small"
              style={{ marginBottom: "30px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="contained"
              disableElevation
              fullWidth
              style={{ marginBottom: "30px", minHeight: "37px" }}
              disabled={loading}
              // onClick={onSubmit}
              type="submit"
            >
              {loading === false && "Continue"}
              <PulseLoader
                color={"#353b48"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
            </Button>
          </form>
        </Grid>
      )}

      {otpSection && (
        <ForgotPasswordOTPVarify
          email={email}
          reference={reference}
          setReference={setReference}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
