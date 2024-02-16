import React from "react";
import Chip from "@mui/material/Chip";
import { Box, Grid, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import { useTheme } from "@mui/material/styles";

const GenderAndAge = ({
  gender,
  setGender,
  min_age,
  setMin_age,
  max_age,
  setMax_age,
}) => {
  const theme = useTheme();
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  return (
    <div>
      {" "}
      <Typography
        variant="h6"
        color="text.main"
        sx={{
          //   textAlign: "center",

          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        Gender
      </Typography>
      <FormControl sx={{ pl: 2, mb: 3 }}>
        {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={gender}
          onChange={handleGender}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
          }}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Both" control={<Radio />} label="Both" />
        </RadioGroup>
      </FormControl>
      <Typography
        variant="h6"
        color="text.main"
        sx={{
          //   textAlign: "center",

          fontSize: "20px",
          fontWeight: 500,
          mb: 2,
        }}
      >
        Age
      </Typography>
      <Box sx={{ px: 2 }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Min Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Min Age"
                  size="small"
                  value={min_age}
                  onChange={(e) => setMin_age(e.target.value)}
                >
                  {[...Array(48)].map((item, i) => (
                    <MenuItem key={i} value={18 + i}>
                      {18 + i}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h6"
              color="text.main"
              sx={{
                textAlign: "center", 
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              To
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Max Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  label="Max Age"
                  value={max_age}
                  onChange={(e) => setMax_age(e.target.value)}
                >
                  {[...Array(48)].map((item, i) => (
                    <MenuItem key={i} value={18 + i}>
                      {18 + i}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GenderAndAge;
