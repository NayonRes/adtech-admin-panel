import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Container,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import { CopyBlock, a11yLight, a11yDark } from "react-code-blocks";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

const Fonts = () => {
  const theme = useTheme();

  const fontsInfo = [
    {
      title: "H1",
      info: "font size : 48px, line-height : 58px, font-weight : 400",
      code: `<Typography variant="h1" color="text.main"></Typography>`,
    },
    {
      title: "H2",
      info: "font size : 40px, line-height : 50px, font-weight : 400",
      code: `<Typography variant="h2" color="text.main"></Typography>`,
    },
    {
      title: "H3",
      info: "font size : 32px, line-height : 42px, font-weight : 400",
      code: `<Typography variant="h3" color="text.main"></Typography>`,
    },
    {
      title: "H4",
      info: "font size : 28px, line-height : 38px, font-weight : 400",
      code: `<Typography variant="h4" color="text.main"></Typography>`,
    },
    {
      title: "H5",
      info: "font size : 24px, line-height : 34px, font-weight : 400",
      code: `<Typography variant="h5" color="text.main"></Typography>`,
    },
    {
      title: "H6",
      info: "font size : 20px, line-height : 30px, font-weight : 400",
      code: `<Typography variant="h6" color="text.main"></Typography>`,
    },
    {
      title: "Base",
      info: "font size : 16px, line-height : 26px, font-weight : 400",
      code: `<Typography variant="base" color="text.main"></Typography>`,
    },
    {
      title: "Medium",
      info: "font size : 14px, line-height : 20px, font-weight : 400",
      code: `<Typography variant="medium" color="text.main"></Typography>`,
    },
    {
      title: "Small",
      info: "font size : 12px, line-height : 18px, font-weight : 400",
      code: `<Typography variant="small" color="text.main"></Typography>`,
    },
    {
      title: "XSmall",
      info: "font size : 10px, line-height : 16px, font-weight : 400",
      code: `<Typography variant="xsmall" color="text.main"></Typography>`,
    },
    {
      title: "XXSmall",
      info: "font size : 8px, line-height : 10px, font-weight : 400",
      code: `<Typography variant="xxsmall" color="text.main"></Typography>`,
    },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Container>
      {fontsInfo?.map((item, i) => (
        <Paper key={i} sx={{px:3, py: 2, mb: 1 }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={2}>
              {" "}
              <Typography
                variant="h3"
                color="text.main"
                sx={{ borderRight: `3px solid ${theme.palette.border.main}` }}
              >
                {item.title}
              </Typography>
            </Grid>
            <Grid item xs={10} sx={{ position: "relative" }}>
              <Typography variant="h6" color="text.main" sm={{ mb: 1 }}>
                {item.info}
              </Typography>
              <pre style={{ fontSize: "14px", margin: 0 }}>
                <CopyBlock
                  language={"jsx"}
                  text={item.code}
                  showLineNumbers={false}
                  theme={theme.palette.mode === "light" ? a11yDark : a11yLight}
                  wrapLines={true}
                  codeBlock
                />
              </pre>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <br />
      <br />
      <Paper sx={{p:3}}>
        <Typography Variant="h1" color="text.main"></Typography>

        <Typography variant="h1" color="text.main" gutterBottom>
          h1. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="h4" gutterBottom>
          h4. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="h5" gutterBottom>
          h5. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="h6" gutterBottom>
          h6. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="base" gutterBottom>
          base. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="medium" gutterBottom>
          medium. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="small" gutterBottom>
          small. The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="xsmall" gutterBottom>
          xsmall. The quick brown fox jumps over the lazy dog.
        </Typography>

        <Typography variant="xxsmall" display="block" gutterBottom>
          xxsmall text
        </Typography>
      </Paper>
    </Container>
  );
};

export default Fonts;
