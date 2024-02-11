import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField, Typography } from "@mui/material";

const Objective = ({
  promotion_objective,
  setPromotion_objective,
  postLink,
  setPostLink,
  websiteLink,
  setWebsiteLink,
  videoLink,
  setVideoLink,
}) => {
  const obectives = [
    {
      title: "Message",
      msg: "Get messages from potential customers using messaging apps.",
    },
    {
      title: "Traffic",
      msg: "Get messages from potential customers using messaging apps.",
    },
    { title: "Reach", msg: "Expand your brand's reach to a maximum audience." },
    { title: "Engagement", msg: "Get more likes and comments on your post." },
    { title: "Leads", msg: "Capture more leads for your business." },
    { title: "Video views", msg: "Get more people to watch your video" },
  ];

  const handleChange = (event) => {
    setPromotion_objective(event.target.value);
  };
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
      <FormControl sx={{ pl: 3 }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={promotion_objective}
          onChange={handleChange}
        >
          {obectives?.map((item, i) => (
            <FormControlLabel
              value={item?.title}
              control={<Radio />}
              label={item?.title}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Typography variant="medium" color="text.main" sx={{ mt: 1, mb: 2 }}>
        {obectives.find((res) => res.title === promotion_objective)?.msg}
      </Typography>
      {promotion_objective !== "Video views" && (
        <TextField
          sx={{ mb: 2 }}
          required
          fullWidth
          label="Post Link"
          size="small"
          variant="outlined"
          id="postLink"
          value={postLink}
          onChange={(e) => setPostLink(e.target.value)}
        />
      )}
      {promotion_objective === "Reach" && (
        <TextField
          sx={{ mb: 2 }}
          required
          fullWidth
          label="Video Link"
          size="small"
          variant="outlined"
          id="videoLink"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      )}
      {promotion_objective === "Video views" && (
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="Website Link (Optional)"
          size="small"
          variant="outlined"
          id="videoLink"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      )}
    </div>
  );
};

export default Objective;
