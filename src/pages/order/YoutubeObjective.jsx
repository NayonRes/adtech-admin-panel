import React, { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Collapse from "@mui/material/Collapse";
import { useTheme } from "@mui/material/styles";
const YoutubeObjective = ({
  promotion_objective,
  setPromotion_objective,
  postLink,
  setPostLink,
  websiteLink,
  setWebsiteLink,
  videoLink,
  setVideoLink,
  messageMedia,
  setMessageMedia,
  leadItems,
  setLeadItems,
}) => {
  const theme = useTheme();
  const obectives = [
    {
      title: "Video views",
      msg: "Get more people to watch your video on YouTube.",
    },
  ];

  const clearFacebookObjectiveItem = () => {
    setWebsiteLink("");
    setVideoLink("");
  };
  const handleChange = (event) => {
    setPromotion_objective(event.target.value);
    clearFacebookObjectiveItem();
  };

  useEffect(() => {
    setPromotion_objective("Video views");
  }, []);

  return (
    <div>
      <Typography
        variant="h6"
        color="text.main"
        sx={{
          //   textAlign: "center",

          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        Objective
      </Typography>
      <FormControl sx={{ pl: 3, mb: 3 }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={promotion_objective}
          onChange={handleChange}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
          }}
        >
          {obectives?.map((item, i) => (
            <FormControlLabel
              // sx={{
              //   fontSize:"13px"
              //   // color:theme.palette.text.light,
              // }}
              value={item?.title}
              control={<Radio />}
              label={item?.title}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <TextField
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-input": {
            // color: "#718096",
            padding: "7px 14px",
          },
        }}
        required
        fullWidth
        label="Youtube Video Link"
        size="small"
        variant="outlined"
        id="videoLink"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />

      <TextField
        sx={{
          mb: 1,
          "& .MuiOutlinedInput-input": {
            // color: "#718096",
            padding: "7px 14px",
          },
        }}
        fullWidth
        label="Website Link (Optional)"
        size="small"
        variant="outlined"
        id="websiteLink"
        value={websiteLink}
        onChange={(e) => setWebsiteLink(e.target.value)}
      />
      <Typography variant="medium" color="text.main" sx={{ mt: 1, mb: 1 }}>
        {obectives.find((res) => res.title === promotion_objective)?.msg}
      </Typography>
    </div>
  );
};

export default YoutubeObjective;
