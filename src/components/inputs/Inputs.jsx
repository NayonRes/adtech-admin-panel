import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { CopyBlock, a11yLight, a11yDark, dracula } from "react-code-blocks";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
const useStyles = makeStyles((theme) => ({
  floatingLabelFocusStyle: {
    color: "#ABCCFE !important",
  },

  customInput1: {
    // "& label.Mui-focused": {
    //   color: theme.palette.text.light,
    // },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "#B2BAC2",
    // },
    "& .MuiOutlinedInput-root": {
      background: theme.palette.primary.main,
      borderRadius: "100vw",
      color: theme.palette.text.fade,
      fontSize: "16px",
      padding: "15px 24px",
      "& .MuiOutlinedInput-input": {
        padding: "0px",
      },
      "& fieldset": {
        borderWidth: "2px",
        borderColor: theme.palette.text.fade,
        borderRadius: "100vw",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
        borderRadius: "100vw",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "4px",
        borderRadius: "100vw",
      },
    },
    "& input::placeholder": {
      color: theme.palette.text.fade, // Change this to your desired placeholder color
      opacity: 1,
    },
  },
  customInput: {
    "& label.Mui-focused": {
      color: theme.palette.text.light,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      background: "red",
      borderRadius: 6,
      // fontSize: "10px",
      // padding: "10px 120px",
      "& fieldset": {
        borderColor: "#E0E3E7",
        borderColor: "red",
        borderRadius: 6,
      },
      "&:hover fieldset": {
        // borderColor: theme.palette.primary.main,

        borderRadius: 6,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderRadius: 6,
      },
    },
    "& input::placeholder": {
      color: "#ABCCFE", // Change this to your desired placeholder color
    },
  },
}));
const Inputs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [fontSize, setFontSize] = useState("16px");
  const [fontColor, setFontColor] = useState(theme.palette.text.fade);
  const [padding, setPadding] = useState("15px 24px");
  const [placeholderColor, setPlaceholderColor] = useState(
    theme.palette.text.fade
  );
  const [background, setBackground] = useState("");
  const [borderWidth, setBorderWidth] = useState("1px");
  const [borderColor, setBorderColor] = useState(theme.palette.text.fade);
  const [borderRadius, setBorderRadius] = useState("100px");
  const [hoverBorderColor, setHoverBorderColor] = useState(
    theme.palette.primary.main
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const customCSS = {
    "& .MuiOutlinedInput-root": {
      background: background,
      borderRadius: borderRadius,
      color: fontColor,
      fontSize: fontSize,
      padding: padding,
      "& .MuiOutlinedInput-input": {
        padding: "0px",
      },
      "& fieldset": {
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
      },
      "&:hover fieldset": {
        borderColor: hoverBorderColor,
        borderRadius: borderRadius,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
        borderRadius: borderRadius,
      },
    },
    "& input::placeholder": {
      color: placeholderColor, // Change this to your desired placeholder color
      opacity: 1,
    },
  };

  const mycodes = `
  const useStyles = makeStyles((theme) => ({
    outlinedWithoutLabelCss: ${JSON.stringify(customCSS, null, 2)}
  }));
  `;
  console.log("mycodes", mycodes);
  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={12}>
          <Typography variant="h6" gutterBottom>
            Outlined Without Label
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Font Size"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Font Color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Border Radius"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Placeholder Color"
                value={placeholderColor}
                onChange={(e) => setPlaceholderColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Padding"
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Background Color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Border Width"
                value={borderWidth}
                onChange={(e) => setBorderWidth(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Border Color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Hover Border Color"
                value={hoverBorderColor}
                onChange={(e) => setHoverBorderColor(e.target.value)}
              />
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Grid item xs={4}>
              {" "}
              <TextField
                fullWidth
                id="outlined-basic"
                // className={customCSS}
                sx={customCSS}
                variant="outlined"
                placeholder="Outlined without label"
              />
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="outlined"
                sx={{ borderRadius: "100px" }}
                endIcon={
                  checked ? (
                    <KeyboardArrowUpRoundedIcon />
                  ) : (
                    <KeyboardArrowDownRoundedIcon />
                  )
                }
                onClick={handleChange}
              >
                {" "}
                {checked ? "Hide code" : "Show code"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Collapse in={checked} collapsedSize={160}>
            <pre style={{ fontSize: "14px", margin: 0 }}>
              <CopyBlock
                language={"jsx"}
                text={mycodes}
                showLineNumbers={false}
                theme={dracula}
                wrapLines={true}
                codeBlock
              />
            </pre>
          </Collapse>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <small>
            cutomise hover effect, border color,border-radius,placeholder color
          </small>
          <TextField
            fullWidth
            id="outlined-basic"
            className={classes.customInput1}
            variant="outlined"
            placeholder="Outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            id="outlined-basic"
            // shrink={true}
            className={classes.customInput}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            label="Outlined"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            id="outlined-basic"
            // shrink={true}
            className={classes.customInput}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            label="Outlined"
            placeholder="outlined"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Inputs;
