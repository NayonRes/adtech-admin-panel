import React, { useEffect } from "react";
import FacebookObjective from "./FacebookObjective";
import GoogleObjective from "./GoogleObjective";
import YoutubeObjective from "./YoutubeObjective";

const Objective = ({
  promotion,
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

  link,
  setLink,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const clearObjectiveItem = () => {
    // facebook objective value
    setPromotion_objective("");
    setPostLink("");
    setWebsiteLink("");
    setVideoLink("");
    setLeadItems([]);
    setMessageMedia([]);
    // google objective value
    setLink("");
    setTitle("");
    setDescription("");
    // youtube objective value
  };
  useEffect(() => {
    clearObjectiveItem();
  }, [promotion]);

  if (promotion === "Facebook") {
    return (
      <FacebookObjective
        promotion_objective={promotion_objective}
        setPromotion_objective={setPromotion_objective}
        postLink={postLink}
        setPostLink={setPostLink}
        websiteLink={websiteLink}
        setWebsiteLink={setWebsiteLink}
        videoLink={videoLink}
        setVideoLink={setVideoLink}
        messageMedia={messageMedia}
        setMessageMedia={setMessageMedia}
        leadItems={leadItems}
        setLeadItems={setLeadItems}
      />
    );
  }
  if (promotion === "Google") {
    return (
      <GoogleObjective
        promotion_objective={promotion_objective}
        setPromotion_objective={setPromotion_objective}
        link={link}
        setLink={setLink}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    );
  }
  if (promotion === "Youtube") {
    return (
      <YoutubeObjective
        promotion_objective={promotion_objective}
        setPromotion_objective={setPromotion_objective}
        postLink={postLink}
        setPostLink={setPostLink}
        websiteLink={websiteLink}
        setWebsiteLink={setWebsiteLink}
        videoLink={videoLink}
        setVideoLink={setVideoLink}
        messageMedia={messageMedia}
        setMessageMedia={setMessageMedia}
        leadItems={leadItems}
        setLeadItems={setLeadItems}
      />
    );
  }
};

export default Objective;
