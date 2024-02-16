import React from "react";
import Chip from "@mui/material/Chip";
import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

const Budget = ({
  amount,
  setAmount,
  promotion_period,
  setPromotion_period,
}) => {
  const theme = useTheme();
  const handleChange = (event) => {
    setPromotion_period(event.target.value);
  };
  function valuetext(value) {
    setAmount(value);
    return `${value}°C`;
  }
  return (
    <div>
      {" "}
      <Typography
        variant="medium"
        color="text.main"
        sx={{
          mt: 1,
          mb: 4,
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        Select Your Budget
      </Typography>
      <Box sx={{ px: 4 }}>
        <Slider
          sx={{
            "& .MuiSlider-valueLabel": {
              background: theme.palette.primary.main,
              color: "#fff",
            },
          }}
          aria-label="Temperature"
          defaultValue={1000}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          shiftStep={30}
          step={500}
          marks
          min={1000}
          max={10000}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            // onClick={() => valuetext(`${1000}°C`)}
            // sx={{ cursor: "pointer" }}
          >
            TK. 1000
          </Typography>
          <Typography
            variant="body2"
            // onClick={() => valuetext(`${10000}°C`)}
            // sx={{ cursor: "pointer" }}
          >
            TK. 10000
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Chip
          sx={{
            borderRadius: "8px",
            px: 2,
            py: 3,
            fontSize: "20px",
            fontWeight: 500,
            color: theme.palette.text.light,
            border:`1px solid ${theme.palette.text.light}`
          }}
          label={`Tk. ${amount}`}
          variant="outlined"
        />
      </Box>
      <Typography
        variant="medium"
        color="text.main"
        sx={{
          mt: 1,
          mb: 3,
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        Select Your Boosting Period
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <FormControl fullWidth sx={{ width: 120 }}>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <Select
            // sx={{
            //   "& .MuiOutlinedInput-input": {
            //     // color: "#718096",
            //     padding: "7px 14px",
            //   },
            // }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={promotion_period}
            //   label="Age"
            onChange={handleChange}
          >
            <MenuItem value={1}>1 Day</MenuItem>
            <MenuItem value={2}>2 Days</MenuItem>
            <MenuItem value={3}>3 Days</MenuItem>
            <MenuItem value={4}>4 Days</MenuItem>
            <MenuItem value={5}>5 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Budget;
