import React, { useEffect } from "react";
import {
  Badge,
  Container,
  FormControl,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import ColumnChart from "../../components/charts/ColumnChart";
import AreaChart from "../../components/charts/AreaChart";
import MenuIcon from "../../components/icons/MenuIcon";
import VerifyIcon from "../../components/icons/VerifyIcon";
import SecurityIcon from "../../components/icons/SecurityIcon";
import ListIcon2 from "../../components/icons/ListIcon2";
import MoneyIcon from "../../components/icons/MoneyIcon";
import UncompletedIcon from "../../components/icons/UncompletedIcon";
import FailedIcon from "../../components/icons/FailedIcon";
import FolderIcon from "../../components/icons/FolderIcon";
import DownloadIcon from "../../components/icons/DownloadIcon";
import MessageIcon from "../../components/icons/MessageIcon";
import MoonIcon from "../../components/icons/MoonIcon";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PlaylistRemoveOutlinedIcon from "@mui/icons-material/PlaylistRemoveOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
const Dashboard = () => {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(50);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 50 ? 10 : prevProgress + 10));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          {/* <Box sx={{ py: 3, px: 0, height: "174px" }}> */}{" "}
          {/* <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.125, px: 3 }}
            >
              <Grid item xs="auto">
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Statistics
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography
                  variant="medium"
                  color="text.main"
                  sx={{ fontWeight: 400 }}
                >
                  Updated 1 month ago
                </Typography>
              </Grid>
            </Grid>
            <Divider /> */}
          <Grid container alignItems="center" spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={3}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs="auto">
                    {" "}
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: `${theme.palette.info.light}`,
                      }}
                    >
                      <BallotOutlinedIcon
                        sx={{ color: theme.palette.info.main }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography
                      variant="h5"
                      color="text.light"
                      sx={{ fontWeight: 500 }}
                    >
                      91825
                    </Typography>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 400 }}
                    >
                      Total Orders
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs="auto">
                    {" "}
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: `${theme.palette.success.light}`,
                      }}
                    >
                      <FactCheckOutlinedIcon
                        sx={{ color: theme.palette.success.main }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography
                      variant="h5"
                      color="text.light"
                      sx={{ fontWeight: 500 }}
                    >
                      9862
                    </Typography>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 400 }}
                    >
                      Complete Orders
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs="auto">
                    {" "}
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: `${theme.palette.warning.light}`,
                      }}
                    >
                      <ListAltOutlinedIcon
                        sx={{ color: theme.palette.warning.main }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography
                      variant="h5"
                      color="text.light"
                      sx={{ fontWeight: 500 }}
                    >
                      6926
                    </Typography>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 400 }}
                    >
                      Pending Orders
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs="auto">
                    {" "}
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: `${theme.palette.secondary.light}`,
                      }}
                    >
                      <PlaylistRemoveOutlinedIcon sx={{color:theme.palette.secondary.main}} />
                    </Avatar>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography
                      variant="h5"
                      color="text.light"
                      sx={{ fontWeight: 500 }}
                    >
                      1681
                    </Typography>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 400 }}
                    >
                      Refunded Orders
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {/* </Box> */}
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ p: 3 }}>
            {" "}
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minHeight: "410px" }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs="auto">
                  {" "}
                  <Typography
                    variant="base"
                    color="text.main"
                    sx={{ fontWeight: 500 }}
                  >
                    Refunded Orders
                  </Typography>
                  <Typography
                    variant="medium"
                    color="text.main"
                    sx={{ fontWeight: 400 }}
                  >
                    Weekly Attempted Overview
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <IconButton>
                    <MenuIcon color={theme.palette.text.light} />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container alignItems="end" spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="h2"
                    color="text.main"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                  >
                    168.5K
                  </Typography>
                  <Typography
                    variant="medium"
                    color="text.main"
                    sx={{ fontWeight: 400, mb: 2 }}
                  >
                    You informed of this week compared to last week
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {/* <img
                    src={
                      theme.palette.mode === "light"
                        ? "/images/Chart1_Light.png"
                        : "/images/Chart1_Dark.png"
                    }
                    width="100%"
                  /> */}
                  <ColumnChart />
                </Grid>
              </Grid>
              <Box
                sx={{
                  px: 2.5,
                  py: 2,
                  borderRadius: "6px",
                  border: `1px solid ${theme.palette.border.main}`,
                  width: "100%",
                }}
              >
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={4}>
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 1.125 }}
                    >
                      <Grid item xs="auto">
                        {" "}
                        <Avatar
                          sx={{ bgcolor: `${theme.palette.success.light}` }}
                          variant="rounded"
                        >
                          <VerifyIcon color={theme.palette.success.main} />
                        </Avatar>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography
                          variant="h5"
                          color="text.light"
                          className="fw6"
                        >
                          84042
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ mb: 1.125, fontWeight: 500 }}
                    >
                      Success
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        color="primary"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 1.125 }}
                    >
                      <Grid item xs="auto">
                        {" "}
                        <Avatar
                          sx={{ bgcolor: `${theme.palette.warning.light}` }}
                          variant="rounded"
                        >
                          <UncompletedIcon color={theme.palette.warning.main} />
                        </Avatar>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography
                          variant="h5"
                          color="text.light"
                          className="fw6"
                        >
                          42,021
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ mb: 1.125, fontWeight: 500 }}
                    >
                      Not Completed
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={25}
                        color="warning"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 1.125 }}
                    >
                      <Grid item xs="auto">
                        {" "}
                        <Avatar
                          sx={{ bgcolor: `${theme.palette.error.light}` }}
                          variant="rounded"
                        >
                          <FailedIcon color={theme.palette.error.main} />
                        </Avatar>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography
                          variant="h5"
                          color="text.light"
                          className="fw6"
                        >
                          42,021
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ mb: 1.125, fontWeight: 500 }}
                    >
                      Failed
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={25}
                        color="error"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 3, pb: 0 }}>
            {" "}
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.125 }}
            >
              <Grid item xs="auto">
                {" "}
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Store Credentials
                </Typography>
                <Typography
                  variant="medium"
                  color="text.main"
                  sx={{ fontWeight: 400 }}
                >
                  Weekly Attempted Overview
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <IconButton>
                  <MenuIcon color={theme.palette.text.light} />
                </IconButton>
              </Grid>
            </Grid>
            <Alert severity="" color="warning" sx={{ mb: 1.125 }}>
              Important: Please do not share your Store ID or Store Password
              with anyone.
            </Alert>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead sx={{ borderTop: "1px solid #E5E5E5" }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>STORE ID</TableCell>
                    <TableCell>PASSWORD</TableCell>
                    <TableCell>UPDATE</TableCell>
                    <TableCell align="right">
                      <MenuIcon color={theme.palette.text.light} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map(() => (
                    <TableRow
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          fontWeight: 500,
                        }}
                      >
                        Cameron Williamson
                      </TableCell>
                      <TableCell>ZYN5i1643310414733ODWe7</TableCell>
                      <TableCell>******</TableCell>
                      <TableCell
                        sx={{
                          color: `${theme.palette.text.light}`,
                        }}
                      >
                        17 June 2022
                      </TableCell>
                      <TableCell align="right">
                        <MenuIcon color={theme.palette.text.light} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <TablePagination
                  component="div"
                  count={100}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 3, minHeight: "392px" }}>
            {" "}
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Grid item xs="auto">
                {" "}
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Sales by Countries
                </Typography>
                <Typography
                  variant="medium"
                  color="text.main"
                  sx={{ fontWeight: 400 }}
                >
                  Monthly Sales Overview
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <IconButton>
                  <MenuIcon color={theme.palette.text.light} />
                </IconButton>
              </Grid>
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                {[1, 2, 3, 4, 5].map(() => (
                  <TableRow sx={{ "& td": { border: 0 } }}>
                    <TableCell sx={{ width: "30px" }}>
                      <Avatar
                        variant="rounded"
                        src="/images/flag.png"
                        sx={{ width: 32, height: 32 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="medium"
                        color="text.main"
                        sx={{ fontWeight: 500 }}
                      >
                        $8.45k
                      </Typography>
                      <Typography
                        variant="medium"
                        color="text.light"
                        sx={{ fontWeight: 400 }}
                      >
                        United Arab Emirates
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="medium"
                        color="success.main"
                        sx={{ fontWeight: 400 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="9"
                          viewBox="0 0 16 9"
                          fill="none"
                        >
                          <path
                            d="M14.5999 7.54158L9.16657 2.10825C8.5249 1.46658 7.4749 1.46658 6.83324 2.10825L1.3999 7.54158"
                            stroke="#69CB1C"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>{" "}
                        &nbsp; 25.8%
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 3, minHeight: "392px" }}>
            {" "}
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs="auto">
                {" "}
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Total Demo Requested
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <IconButton>
                  <MenuIcon color={theme.palette.text.light} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <Grid item xs="auto">
                <Typography
                  variant="h2"
                  color="text.main"
                  sx={{ fontWeight: 600 }}
                >
                  298.5k
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography
                  variant="medium"
                  color="success.main"
                  sx={{ fontWeight: 400 }}
                >
                  0.3%
                </Typography>
              </Grid>
            </Grid>
            {/* <img src="/images/Chart.png" alt="" width="100%" /> */}
            <AreaChart />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 3, minHeight: "392px" }}>
            {" "}
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Grid item xs="auto">
                {" "}
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Monthly Requested State
                </Typography>
                <Typography
                  variant="medium"
                  color="text.main"
                  sx={{ fontWeight: 400 }}
                >
                  8.52k requested
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <IconButton>
                  <MenuIcon color={theme.palette.text.light} />
                </IconButton>
              </Grid>
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.success.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z"
                          stroke={theme.palette.success.main}
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75"
                          stroke={theme.palette.success.main}
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Emails
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      12,346
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="success.main"
                      sx={{ fontWeight: 400 }}
                    >
                      0.3%
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.info.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M13.8524 12.6225L14.1449 14.9925C14.2199 15.615 13.5524 16.05 13.0199 15.7275L9.87738 13.86C9.53238 13.86 9.19489 13.8375 8.86489 13.7925C9.41989 13.14 9.74989 12.315 9.74989 11.4225C9.74989 9.29249 7.90489 7.56752 5.62489 7.56752C4.75489 7.56752 3.95239 7.815 3.28489 8.25C3.26239 8.0625 3.25488 7.87499 3.25488 7.67999C3.25488 4.26749 6.21738 1.5 9.87738 1.5C13.5374 1.5 16.4999 4.26749 16.4999 7.67999C16.4999 9.70499 15.4574 11.4975 13.8524 12.6225Z"
                          stroke={theme.palette.info.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.75 11.4225C9.75 12.315 9.42001 13.14 8.86501 13.7925C8.12251 14.6925 6.945 15.27 5.625 15.27L3.6675 16.4325C3.3375 16.635 2.9175 16.3575 2.9625 15.975L3.15 14.4975C2.145 13.8 1.5 12.6825 1.5 11.4225C1.5 10.1025 2.205 8.93998 3.285 8.24998C3.9525 7.81498 4.755 7.5675 5.625 7.5675C7.905 7.5675 9.75 9.29247 9.75 11.4225Z"
                          stroke={theme.palette.info.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Direct massage
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      8,734
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="success.main"
                      sx={{ fontWeight: 400 }}
                    >
                      2.1%
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.warning.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M16.4775 13.7475C16.4775 14.0175 16.4175 14.295 16.29 14.565C16.1625 14.835 15.9975 15.09 15.78 15.33C15.4125 15.735 15.0075 16.0275 14.55 16.215C14.1 16.4025 13.6125 16.5 13.0875 16.5C12.3225 16.5 11.505 16.32 10.6425 15.9525C9.78 15.585 8.9175 15.09 8.0625 14.4675C7.2 13.8375 6.3825 13.14 5.6025 12.3675C4.83 11.5875 4.1325 10.77 3.51 9.915C2.895 9.06 2.4 8.205 2.04 7.3575C1.68 6.5025 1.5 5.685 1.5 4.905C1.5 4.395 1.59 3.9075 1.77 3.4575C1.95 3 2.235 2.58 2.6325 2.205C3.1125 1.7325 3.6375 1.5 4.1925 1.5C4.4025 1.5 4.6125 1.545 4.8 1.635C4.995 1.725 5.1675 1.86 5.3025 2.055L7.0425 4.5075C7.1775 4.695 7.275 4.8675 7.3425 5.0325C7.41 5.19 7.4475 5.3475 7.4475 5.49C7.4475 5.67 7.395 5.85 7.29 6.0225C7.1925 6.195 7.05 6.375 6.87 6.555L6.3 7.1475C6.2175 7.23 6.18 7.3275 6.18 7.4475C6.18 7.5075 6.1875 7.56 6.2025 7.62C6.225 7.68 6.2475 7.725 6.2625 7.77C6.3975 8.0175 6.63 8.34 6.96 8.73C7.2975 9.12 7.6575 9.5175 8.0475 9.915C8.4525 10.3125 8.8425 10.68 9.24 11.0175C9.63 11.3475 9.9525 11.5725 10.2075 11.7075C10.245 11.7225 10.29 11.745 10.3425 11.7675C10.4025 11.79 10.4625 11.7975 10.53 11.7975C10.6575 11.7975 10.755 11.7525 10.8375 11.67L11.4075 11.1075C11.595 10.92 11.775 10.7775 11.9475 10.6875C12.12 10.5825 12.2925 10.53 12.48 10.53C12.6225 10.53 12.7725 10.56 12.9375 10.6275C13.1025 10.695 13.275 10.7925 13.4625 10.92L15.945 12.6825C16.14 12.8175 16.275 12.975 16.3575 13.1625C16.4325 13.35 16.4775 13.5375 16.4775 13.7475Z"
                          stroke={theme.palette.warning.main}
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M13.875 6.75C13.875 6.3 13.5225 5.61 12.9975 5.0475C12.5175 4.53 11.88 4.125 11.25 4.125"
                          stroke={theme.palette.warning.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5 6.75C16.5 3.8475 14.1525 1.5 11.25 1.5"
                          stroke={theme.palette.warning.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Phone Call
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      967
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="error.main"
                      sx={{ fontWeight: 400 }}
                    >
                      1.4%
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.error.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                      >
                        <path
                          d="M12.75 0.999969H3.25C2.14543 0.999969 1.25 1.8954 1.25 2.99997V11C1.25 12.1045 2.14543 13 3.25 13H12.75C13.8546 13 14.75 12.1045 14.75 11V2.99997C14.75 1.8954 13.8546 0.999969 12.75 0.999969Z"
                          stroke={theme.palette.error.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.75 3.99997H1.25"
                          stroke={theme.palette.error.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.75 2.5H5.75"
                          stroke={theme.palette.error.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Via Portal
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      345
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="success.main"
                      sx={{ fontWeight: 400 }}
                    >
                      8.5%
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.success.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z"
                          stroke={theme.palette.success.main}
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75"
                          stroke={theme.palette.success.main}
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Emails
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      12,346
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="success.main"
                      sx={{ fontWeight: 400 }}
                    >
                      0.3%
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.info.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M13.8524 12.6225L14.1449 14.9925C14.2199 15.615 13.5524 16.05 13.0199 15.7275L9.87738 13.86C9.53238 13.86 9.19489 13.8375 8.86489 13.7925C9.41989 13.14 9.74989 12.315 9.74989 11.4225C9.74989 9.29249 7.90489 7.56752 5.62489 7.56752C4.75489 7.56752 3.95239 7.815 3.28489 8.25C3.26239 8.0625 3.25488 7.87499 3.25488 7.67999C3.25488 4.26749 6.21738 1.5 9.87738 1.5C13.5374 1.5 16.4999 4.26749 16.4999 7.67999C16.4999 9.70499 15.4574 11.4975 13.8524 12.6225Z"
                          stroke={theme.palette.info.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.75 11.4225C9.75 12.315 9.42001 13.14 8.86501 13.7925C8.12251 14.6925 6.945 15.27 5.625 15.27L3.6675 16.4325C3.3375 16.635 2.9175 16.3575 2.9625 15.975L3.15 14.4975C2.145 13.8 1.5 12.6825 1.5 11.4225C1.5 10.1025 2.205 8.93998 3.285 8.24998C3.9525 7.81498 4.755 7.5675 5.625 7.5675C7.905 7.5675 9.75 9.29247 9.75 11.4225Z"
                          stroke={theme.palette.info.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Direct massage
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      8,734
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="success.main"
                      sx={{ fontWeight: 400 }}
                    >
                      2.1%
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell sx={{ width: "30px" }}>
                    <Avatar
                      sx={{ bgcolor: `${theme.palette.warning.light}` }}
                      variant="rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M16.4775 13.7475C16.4775 14.0175 16.4175 14.295 16.29 14.565C16.1625 14.835 15.9975 15.09 15.78 15.33C15.4125 15.735 15.0075 16.0275 14.55 16.215C14.1 16.4025 13.6125 16.5 13.0875 16.5C12.3225 16.5 11.505 16.32 10.6425 15.9525C9.78 15.585 8.9175 15.09 8.0625 14.4675C7.2 13.8375 6.3825 13.14 5.6025 12.3675C4.83 11.5875 4.1325 10.77 3.51 9.915C2.895 9.06 2.4 8.205 2.04 7.3575C1.68 6.5025 1.5 5.685 1.5 4.905C1.5 4.395 1.59 3.9075 1.77 3.4575C1.95 3 2.235 2.58 2.6325 2.205C3.1125 1.7325 3.6375 1.5 4.1925 1.5C4.4025 1.5 4.6125 1.545 4.8 1.635C4.995 1.725 5.1675 1.86 5.3025 2.055L7.0425 4.5075C7.1775 4.695 7.275 4.8675 7.3425 5.0325C7.41 5.19 7.4475 5.3475 7.4475 5.49C7.4475 5.67 7.395 5.85 7.29 6.0225C7.1925 6.195 7.05 6.375 6.87 6.555L6.3 7.1475C6.2175 7.23 6.18 7.3275 6.18 7.4475C6.18 7.5075 6.1875 7.56 6.2025 7.62C6.225 7.68 6.2475 7.725 6.2625 7.77C6.3975 8.0175 6.63 8.34 6.96 8.73C7.2975 9.12 7.6575 9.5175 8.0475 9.915C8.4525 10.3125 8.8425 10.68 9.24 11.0175C9.63 11.3475 9.9525 11.5725 10.2075 11.7075C10.245 11.7225 10.29 11.745 10.3425 11.7675C10.4025 11.79 10.4625 11.7975 10.53 11.7975C10.6575 11.7975 10.755 11.7525 10.8375 11.67L11.4075 11.1075C11.595 10.92 11.775 10.7775 11.9475 10.6875C12.12 10.5825 12.2925 10.53 12.48 10.53C12.6225 10.53 12.7725 10.56 12.9375 10.6275C13.1025 10.695 13.275 10.7925 13.4625 10.92L15.945 12.6825C16.14 12.8175 16.275 12.975 16.3575 13.1625C16.4325 13.35 16.4775 13.5375 16.4775 13.7475Z"
                          stroke={theme.palette.warning.main}
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M13.875 6.75C13.875 6.3 13.5225 5.61 12.9975 5.0475C12.5175 4.53 11.88 4.125 11.25 4.125"
                          stroke={theme.palette.warning.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5 6.75C16.5 3.8475 14.1525 1.5 11.25 1.5"
                          stroke={theme.palette.warning.main}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="medium"
                      color="text.main"
                      sx={{ fontWeight: 500 }}
                    >
                      Phone Call
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="text.light"
                      sx={{ fontWeight: 400 }}
                    >
                      967
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="medium"
                      color="error.main"
                      sx={{ fontWeight: 400 }}
                    >
                      1.4%
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
