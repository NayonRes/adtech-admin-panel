import React from "react";
import FacebookObjective from "./FacebookObjective";

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
}) => {
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
};

export default Objective;
