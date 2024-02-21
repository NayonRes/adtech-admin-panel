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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AddFeedback = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [reviwerName, setReviwerName] = useState("");
  const [reviwerDesignation, setReviwerDesignation] = useState("");
  const [website, setWebsite] = useState("");
  const [videoLink, setVideoLink] = useState("");
 
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  

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

    // let err = false;
    setErrors({});

    setLoading(true);
    try {
      let data = {
        company: companyName.trim(),
        moto: companyDetails.trim(),
        name: reviwerName.trim(),
        designation: reviwerDesignation.trim(),
        website: website.trim(),
        video_link: videoLink.trim(),
      };
      let response = await axios({
        url: "/api/feedback",
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${adtech_admin_panel.token}`,
        },
      });
    
      if (response?.status > 199 && response?.status < 300) {
        handleSnakbarOpen("Successful", "success");
        setCompanyName("");
        setCompanyDetails("");
        setReviwerName("");
        setReviwerDesignation("");
        setWebsite("");
        setVideoLink("");
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
            Add Feedback
          </Typography>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Company Name *
            </Typography>
            <TextField
              required
              id="companyName"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {errors.company && (
              <Typography variant="small" color="error.main">
                {errors.company}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Company Details *
            </Typography>
            <TextField
              required
              id="companyDetails"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
            />
            {errors.moto && (
              <Typography variant="small" color="error.main">
                {errors.moto}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Reviwer Name *
            </Typography>
            <TextField
              required
              id="reviwerName"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={reviwerName}
              onChange={(e) => setReviwerName(e.target.value)}
            />
            {errors.name && (
              <Typography variant="small" color="error.main">
                {errors.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Reviwer Designation *
            </Typography>
            <TextField
              required
              id="reviwerDesignation"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={reviwerDesignation}
              onChange={(e) => setReviwerDesignation(e.target.value)}
            />
            {errors.name && (
              <Typography variant="small" color="error.main">
                {errors.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Reviwer Website
            </Typography>
            <TextField
              id="website"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            {errors.website && (
              <Typography variant="small" color="error.main">
                {errors.website}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "18px" }}>
            <Typography variant="base" htmlFor="name">
              Video Link *
            </Typography>
            <TextField
              required
              id="videoLink"
              // label="Name"
              fullWidth
              size="small"
              variant="outlined"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            {errors.video_link && (
              <Typography variant="small" color="error.main">
                {errors.video_link}
              </Typography>
            )}
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

export default AddFeedback;
