import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const Objective = ({
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
  const messageMediaList = ["Messenger", "WhatsApp"];
  const leadItemList = [
    "Name",
    "Job Title",
    "Company Name",
    "Phone No",
    "Email",
    "Location",
  ];
  const handleChange = (event) => {
    setPromotion_objective(event.target.value);
  };
  const showPostLink = () => {
    if (
      promotion_objective.length > 0 &&
      promotion_objective !== "Video views"
    ) {
      return true;
    }
    return false;
  };
  const handleMessageMedia = (item, i) => {
    console.log("event.target.checked", item);

    if (messageMedia.includes(item)) {
      let newDivisions = messageMedia.filter((res) => res !== item);
      setMessageMedia(newDivisions);
    } else {
      setMessageMedia([...messageMedia, item]);
    }
    console.log("messageMedia", messageMedia);
  };
  const handleLeadItems = (item, i) => {
    console.log("event.target.checked", item);

    if (leadItems.includes(item)) {
      let newDivisions = leadItems.filter((res) => res !== item);
      setLeadItems(newDivisions);
    } else {
      setLeadItems([...leadItems, item]);
    }
    console.log("leadItems", leadItems);
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
      {promotion_objective === "Message" && (
        <FormGroup sx={{ flexDirection: "row" }}>
          {messageMediaList?.map((item, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox />}
              label={item}
              checked={messageMedia.includes(item)}
              onChange={() => {
                handleMessageMedia(item, i);
              }}
            />
          ))}
        </FormGroup>
      )}
      {promotion_objective === "Leads" && (
        <FormGroup sx={{ flexDirection: "row" }}>
          {leadItemList?.map((item, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox />}
              label={item}
              checked={leadItems.includes(item)}
              onChange={() => {
                handleLeadItems(item, i);
              }}
            />
          ))}
        </FormGroup>
      )}

      {showPostLink() && (
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
