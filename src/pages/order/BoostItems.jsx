import React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BoostItems = ({ promotion, setPromotion }) => {
  const theme = useTheme();
  const buttonHolderStyle = {
    py: 1.5,
    fontSize: "24px",
    // color: "#316FF6",
    background: "#fff",
    border: "1px solid #dddddd",
    borderRadius: "8px",
    cursor: "pointer",
    transition: ".5s",
    width: "auto",
    margin: "auto",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
  };

  const socialIconStyle = {
    position: "relative",
    top: "5px",
    width: 32,
    height: 32,
  };
  return (
    <div>
      {" "}
      <Box
        sx={{ marginBottom: "18px" }}
        onClick={() => setPromotion("Facebook")}
      >
        <Box
          sx={{
            ...buttonHolderStyle,
            border:
              promotion === "Facebook"
                ? `1px solid ${theme.palette.primary.main}`
                : "1px solid #dddddd",
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
                  ...socialIconStyle,
                }}
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                // width="100"
                // height="100"
                viewBox="0 0 48 48"
                style={{
                  ...socialIconStyle,
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
              Facebook &nbsp;
              <span style={{ color: "#718096", fontWeight: 200 }}>Ads</span>
            </Grid>
          </Grid>{" "}
        </Box>
      </Box>
      <Box sx={{ marginBottom: "18px" }} onClick={() => setPromotion("Google")}>
        <Box
          sx={{
            ...buttonHolderStyle,
            border:
              promotion === "Google"
                ? `1px solid ${theme.palette.primary.main}`
                : "1px solid #dddddd",
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
                // width="44"
                // height="44"
                viewBox="0 0 48 48"
                style={{
                  ...socialIconStyle,
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
            <Grid item xs="auto" sx={{ color: "#718096" }}>
              Google &nbsp;
              <span style={{ color: "#718096", fontWeight: 200 }}>Ads</span>
            </Grid>
          </Grid>{" "}
        </Box>
      </Box>
      <Box
        sx={{ marginBottom: "18px" }}
        onClick={() => setPromotion("Youtube")}
      >
        <Box
          sx={{
            ...buttonHolderStyle,
            border:
              promotion === "Youtube"
                ? `1px solid ${theme.palette.primary.main}`
                : "1px solid #dddddd",
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
                // width="44"
                // height="44"
                viewBox="0 0 48 48"
                style={{
                  ...socialIconStyle,
                }}
              >
                <path
                  fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                ></path>
                <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
              </svg>
            </Grid>
            <Grid item xs="auto" sx={{ color: "#222" }}>
              You<span style={{ color: "#FF3D00" }}>Tube</span> &nbsp;
              <span style={{ color: "#718096", fontWeight: 200 }}>Ads</span>
            </Grid>
          </Grid>{" "}
        </Box>
      </Box>
    </div>
  );
};

export default BoostItems;
