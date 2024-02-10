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
import { useNavigate, useParams } from "react-router-dom";
import Collapse from "@mui/material/Collapse";

const UpdateCustomer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
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
    // if (password.trim().length < 6) {
    //   handleSnakbarOpen(
    //     "The password field must be at least 6 characters.",
    //     "error"
    //   );
    //   document.getElementById("password").focus();
    //   return (isError = true);
    // }
    // if (!confirmPassword.trim()) {
    //   handleSnakbarOpen("Please enter confirm password", "error");
    //   document.getElementById("confirmPassword").focus();
    //   return (isError = true);
    // }
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
          remarks: remarks,
          status,
        };
        let response = await axios({
          url: `/api/customer/${id}`,
          method: "put",
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

          navigate("/user-list");
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

  const getById = async () => {
    let url = `api/customer/${id}`;
    let res = await getDataWithToken(url, adtech_admin_panel.token);
    console.log("res", res);
    if (res?.status === 401) {
      logout();
      return;
    }
    console.log("res.data.data", res.data.data);

    if (res?.status === 401) {
      logout();
      return;
    }
    if (res?.status > 199 && res?.status < 300) {
      setName(res?.data?.data?.name);
      setEmail(res?.data?.data?.email);
      // setPassword(res?.data?.data?.);
      // setConfirmPassword(res?.data?.data?.);
      setMobileNo(res?.data?.data?.mobile);
      setStatus(res?.data?.data?.status);
    }
  };

  useEffect(() => {
    getById();
  }, []);
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
            padding: " 50px",
            background: "#fff",
            borderRadius: "10px",
            // textAlign: "center",
            width: "550px",
            // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h5"
            component="div"
            style={{ marginBottom: "30px", textAlign: "center" }}
          >
            Update Customer
          </Typography>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Name *
            </Typography>
            <TextField
              required
              id="name"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <Typography variant="small" color="error.main">
                {errors.name}
              </Typography>
            )}
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
              // required
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
              // required
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

          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="mobileNo">
              Status
            </Typography>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  // color: "#718096",
                  padding: "7px 14px",
                },
              }}
            >
              <Select
                labelId="demo-status-outlined-label"
                id="demo-status-outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
            {errors.status && (
              <Typography variant="small" color="error.main">
                {errors.status}
              </Typography>
            )}
          </Box>
          <Collapse in={status === "Inactive"}>
            <Box sx={{ marginBottom: "18px" }}>
              <Typography variant="base" htmlFor="confirmPassword">
                Reason
              </Typography>
              <TextField
                required={status === "Inactive"}
                // label="Confirm Password"
                fullWidth
                size="small"
                variant="outlined"
                id="remarks"
                multiline
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
              {/* {errors.password && (
              <Typography variant="small" color="error.main">
                {errors.password}
              </Typography>
            )} */}
            </Box>
          </Collapse>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            style={{ minHeight: "37px" }}
            disabled={loading}
            // onClick={onSubmit}
            type="submit"
          >
            {loading === false && "Update"}
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

export default UpdateCustomer;
