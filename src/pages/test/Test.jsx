import React, { useState } from "react";
import OtpInput from "react-otp-input";

const Test = () => {
  const [otp, setOtp] = useState("");
  const [myOTP, setMyOTP] = useState({ otp: "" });
  const handleChange = (otp) => {
    setMyOTP({ otp });
  };

  const newInputStyle = {
    background: "none",
    minWidth: "40px",
    minHeight: "40px",
    fontSize: "16px",
    borderRadius: "3px",
    border: "1px solid #c3bebe",
  };
  const newFocusStyle = {
    borderRadius: "3px",
    border: "1px solid #353b48",
    outline: "1px solid #353b48",
  };
  return (
    <div>
      Test
      <OtpInput
        value={myOTP.otp}
        onChange={handleChange}
        numInputs={6}
        isInputNum={true}
        shouldAutoFocus={true}
        isInputSecure={true}
        // renderSeparator={<span>-</span>}
        inputStyle={newInputStyle}
        focusStyle={newFocusStyle}
        renderInput={(props) => <input {...props} />}
        containerStyle={{ justifyContent: "space-between" }}
      />
    </div>
  );
};

export default Test;
