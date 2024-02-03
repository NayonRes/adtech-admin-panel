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
// const useStyles = makeStyles((theme) => ({
//   form: {
//     padding: "50px",
//     background: "#fff",
//     borderRadius: "10px",
//     // textAlign: "center",
//     width: "400px",
//     boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//   },
// }));

const AddUser = () => {
  // const classes = useStyles();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [roleMessage, setRoleMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userTypeList, setUserTypeList] = useState([]);
  const [userTypeId, setUserTypeId] = useState("");
  const [userTypeMessage, setUserTypeMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const validation = () => {
    let isError = false;
    if (!name.trim()) {
      handleSnakbarOpen("Please enter user name", "error");
      document.getElementById("name").focus();
      return (isError = true);
    }
    if (!mobileNo.trim()) {
      handleSnakbarOpen("Please enter mobile number", "error");
      document.getElementById("mobileNo").focus();
      return (isError = true);
    }
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

    if (!password.trim()) {
      handleSnakbarOpen("Please enter password", "error");
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

    if (!roleId.trim()) {
      handleSnakbarOpen("Please select user role", "error");

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

  const onSubmit = async (e) => {
    e.preventDefault();
    let err = validation();

    if (err) {
      return;
    } else {
      setLoading(true);
      try {
        let data = {
          name,
          email,
          mobile: mobileNo,
          role_name: roleId,
        };
        let response = await axios({
          url: "api/create-user",
          method: "post",
          data: data,
          headers: {
            Authorization: `Bearer ${adtech_admin_panel.token}`,
          },
        });
        if (response.data.code === 200) {
          handleSnakbarOpen(response.data.messages.toString(), "success");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setMobileNo("");
          setRoleId("");
        }
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.messages.toString(), "error");
        if (error.response.data.messages.length < 1) {
          handleSnakbarOpen("Something went wrong", "error");
        }
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const getRoles = async (pageNO, newUrl) => {
    setRoleMessage("");
    let url = "api/role";
    let res = await getDataWithToken(url, adtech_admin_panel.token);
    console.log("res", res);
    if (res?.status === 401) {
      logout();
      return;
    }

    if (res?.status > 199 && res?.status < 300) {
      if (res.data.data.length > 0) {
        setRoleList(res.data.data);
      } else {
        setRoleMessage("No data found");
        setRoleList([]);
      }
    }
  };

  useEffect(() => {
    getRoles();
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
            padding: "50px",
            background: "#fff",
            borderRadius: "10px",
            // textAlign: "center",
            width: "400px",
            // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          onsubmit={onSubmit}
        >
          <Typography
            variant="h5"
            component="div"
            style={{ marginBottom: "30px", textAlign: "center" }}
          >
            Add User
          </Typography>
          <TextField
            id="name"
            label="Name"
            fullWidth
            size="small"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "30px" }}
          />
          <TextField
            label="Mobile No"
            fullWidth
            size="small"
            style={{ marginBottom: "30px" }}
            variant="outlined"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            size="small"
            style={{ marginBottom: "30px" }}
            variant="outlined"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            size="small"
            style={{ marginBottom: "30px" }}
            variant="outlined"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            size="small"
            style={{ marginBottom: "30px" }}
            variant="outlined"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "30px" }}
          >
            <InputLabel id="demo-issue-outlined-label">Select role</InputLabel>
            <Select
              labelId="demo-issue-outlined-label"
              id="demo-issue-outlined"
              label="Select role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              {roleMessage.length > 0 && (
                <MenuItem value={roleMessage}>{roleMessage}</MenuItem>
              )}
              {roleList?.map((item, i) => (
                <MenuItem key={i} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

export default AddUser;
