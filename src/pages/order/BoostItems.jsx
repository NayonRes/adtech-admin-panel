import { Box, Grid } from "@mui/material";
import React from "react";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const BoostItems = ({ setPromotion }) => {
  return (
    <div>
      {" "}
      <Box
        sx={{ marginBottom: "18px" }}
        onClick={() => setPromotion("Facebook")}
      >
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
      <Box sx={{ marginBottom: "18px" }} onClick={() => setPromotion("Google")}>
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
      <Box
        sx={{ marginBottom: "18px" }}
        onClick={() => setPromotion("Youtube")}
      >
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
    </div>
  );
};

export default BoostItems;
