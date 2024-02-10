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
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";

const AddOrder = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  //============================

  const [promotion, setPromotion] = useState("");
  const [amount, setAmount] = useState("");
  const [gender, setGender] = useState("");
  const [min_age, setMin_age] = useState(0);
  const [max_age, setMax_age] = useState(0);
  const [location, setLocation] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [promotion_period, setPromotion_period] = useState(0);
  const [promotion_objective_id, setPromotion_objective_id] = useState("");

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
    let err = validation();
    // let err = false;
    setErrors({});

    if (err) {
      return;
    } else {
      setLoading(true);
      try {
        let data = {
          name,
          email,
          mobile: mobileNo,
          password: password,
          password_confirm: confirmPassword,

          // status: "Active",
        };
        let response = await axios({
          url: "/api/auth/register",
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
    }
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
            style={{ marginBottom: "30px", textAlign: "center" }}
          >
            Add Order
          </Typography>
          <Box sx={{ marginBottom: "18px" }} onClick={()=>setPromotion("Facebook")}>
            <Box
              sx={{
                py: 2,
                fontSize: "36px",
                color: "#316FF6",
                background: "#fff",
                border: "1px solid #dddddd",
                borderRadius: "8px",
                cursor: "pointer",
                transition: ".5s",
                "&:hover": {
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                },
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Grid item xs="auto">
                  <FacebookOutlinedIcon
                    style={{
                      fontSize: "44px",
                      position: "relative",
                      top: "5px",
                    }}
                  />
                </Grid>
                <Grid item xs="auto">
                  Facebook &nbsp;
                  <span style={{ color: "#718096", fontWeight: 200 }}>Ads</span>
                </Grid>
              </Grid>{" "}
            </Box>
          </Box>
          <Box sx={{ marginBottom: "18px" }} onClick={()=>setPromotion("Google")}>
            <Box
              sx={{
                py: 2,
                fontSize: "36px",
                color: "#718096",
                background: "#fff",
                border: "1px solid #dddddd",
                borderRadius: "8px",
                cursor: "pointer",
                transition: ".5s",
                "&:hover": {
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                },
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
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    style={{
                      position: "relative",
                      top: "5px",
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
                  <span style={{ color: "#718096", fontWeight: 200 }}>Ads</span>
                </Grid>
              </Grid>{" "}
            </Box>
          </Box>
          <Box sx={{ marginBottom: "18px" }} onClick={()=>setPromotion("Youtube")}>
            <Box
              sx={{
                py: 2,
                fontSize: "36px",
                color: "#222",
                background: "#fff",
                border: "1px solid #dddddd",
                borderRadius: "8px",
                cursor: "pointer",
                transition: ".5s",
                "&:hover": {
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                },
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
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    style={{
                      position: "relative",
                      top: "5px",
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
                  <span style={{ color: "#718096", fontWeight: 200 }}>Ads</span>
                </Grid>
              </Grid>{" "}
            </Box>
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="mobileNo">
              Mobile No *
            </Typography>
            <TextField
              required
              // label="Mobile No"
              fullWidth
              size="small"
              variant="outlined"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
            {errors.mobile && (
              <Typography variant="small" color="error.main">
                {errors.mobile}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="email">
              Email *
            </Typography>
            <TextField
              required
              type="email"
              // label="Email"
              fullWidth
              size="small"
              variant="outlined"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <Typography variant="small" color="error.main">
                {errors.email}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="password">
              Password *{" "}
              <span
                style={{ color: theme.palette.text.light, fontSize: "12px" }}
              >
                (at least 8 characters)
              </span>
            </Typography>
            <TextField
              required
              // label="Password"
              fullWidth
              size="small"
              variant="outlined"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <Typography variant="small" color="error.main">
                {errors.password}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="confirmPassword">
              Confirm Password *
            </Typography>
            <TextField
              required
              // label="Confirm Password"
              fullWidth
              size="small"
              variant="outlined"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* {errors.password && (
              <Typography variant="small" color="error.main">
                {errors.password}
              </Typography>
            )} */}
          </Box>

          <Button
            variant="contained"
            disableElevation
            fullWidth
            style={{ marginBottom: "30px", minHeight: "37px" }}
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
