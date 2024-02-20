import React, { useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chart from "react-apexcharts";
import { PulseLoader, SyncLoader } from "react-spinners";
import CountUp from "react-countup";
const Dashboard = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(50);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [months, setMonths] = useState(12);
  const [totalSummary, setTotalSummary] = useState(0);
  const [totalVerified, setTotalVerified] = useState(0);
  const [summaryList, setSummaryList] = useState([]);
  const [display, setDisplay] = useState(false);
  const [summaryMessage, setSummaryMessage] = useState("");

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "",
        data: [],
      },
      // {
      //   name: "Revenue",
      //   data: [76, 85, 101, 98, 87, 105, 91],
      // },
      //   {
      //     name: "Free Cash Flow",
      //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      //   },
    ],
    options: {
      chart: {
        fontFamily: '"Roboto",sans-serif',

        toolbar: {
          show: false, //download button hide
        },
        type: "bar",
        // height: 350,
      },
      legend: {
        show: false,
        // labels: {
        //   colors: ['red', 'blue', 'green', 'purple'], // Change the legend text colors here
        // },
        // container: {
        //   background: ['blue','blue'], // Change the legend box background color here
        // },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      //   stroke: {
      //     show: true,
      //     width: 2,
      //     colors: ["transparent"],
      //   },
      // xaxis: {
      //   labels: {
      //     style: {
      //       colors: "red", // Change the x-axis label color here
      //     },
      //   },
      //   categories: [],
      // },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.text.light, // Change the x-axis label color here
          },
        },
        title: {
          // text: "   ",
          text: "Attempted vs Verified",
          style: {
            colors: theme.palette.text.light, // Change the x-axis label color here
          },
        },
      },
      fill: {
        opacity: 1,
        colors: [theme.palette.primary.main, theme.palette.success.main],
      },
      tooltip: {
        theme: "dark",
        // theme: theme.palette.mode === "dark" ? "dark" : "light",
        // fillSeriesColor: true,

        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
    minHeight: 250,
  });
  const handleChange = (event) => {
    setMonths(event.target.value);
    getSummaryOfaStore(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const chartContainer = {
    "& text": {
      fill: theme.palette.text.light,
    },
    "& .apexcharts-title": {
      fill: theme.palette.text.light,
    },
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

  const getCurrentMonth = () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let monthName = month[d.getMonth()];
    return monthName;
  };

  const getSummaryOfaStore = async (month) => {
    // setSummaryLoading(true);
    // let newMonth = months;
    // if (month) {
    //   newMonth = month;
    // }
    // let storesSummary = await getDataWithToken(
    //   `getSummary?storeId=${admin_panel_user.selectedStoreId}&numberOfMonth=${newMonth}`,
    //   admin_panel_user,
    //   logout
    // );
    // if (storesSummary?.data?.code === 200) {
    //   let names = [];
    //   let data1 = [];
    //   let data2 = [];
    //   let years = [];
    //   let newTotalSummary = 0;
    //   let newTotalVerified = 0;
    //   if (storesSummary.data.data.summary.length > 0) {
    //     storesSummary.data.data.summary.map((item) => {
    //       newTotalSummary = newTotalSummary + parseInt(item.totalSummary);
    //       newTotalVerified = newTotalVerified + parseInt(item.totalVerified);
    //       names.push(item.month + " " + item.year);
    //       years.push(item.year);
    //       data1.push(item.totalSummary);
    //       data2.push(item.totalVerified);
    //     });
    //   }
    //   console.log("data1", data1);
    //   console.log("names ===========================================", names);
    //   setSummaryList(storesSummary.data.data.summary);
    //   setTotalSummary(newTotalSummary);
    //   setTotalVerified(newTotalVerified);
    //   setChartData({
    //     ...chartData,
    //     series: [
    //       {
    //         name: "Total Applied",
    //         data: data1,
    //       },
    //       {
    //         name: "Total Verified",
    //         data: data2,
    //       },
    //     ],
    //     options: {
    //       ...chartData.options,
    //       xaxis: {
    //         categories: names,
    //       },
    //     },
    //   });
    // } else {
    //   setSummaryMessage(storesSummary.data.message.toString());
    // }
    // setDisplay(true);
    // setSummaryLoading(false);
  };
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
          <Typography
            variant="h6"
            color="text.main"
            sx={{ fontWeight: 500, mt: 2.5, mb: 1 }}
          >
            Orders Summary Of {getCurrentMonth()}
          </Typography>
          <Grid container alignItems="center" spacing={3}>
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
                      <PlaylistRemoveOutlinedIcon
                        sx={{ color: theme.palette.secondary.main }}
                      />
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
              // justifyContent="space-between"
              // alignItems="center"
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
                    Orders
                  </Typography>
                  <Typography
                    variant="medium"
                    color="text.main"
                    sx={{ fontWeight: 400 }}
                  >
                    Last {months} months overview
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  {/* <IconButton>
                    <MenuIcon color={theme.palette.text.light} />
                  </IconButton> */}
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Months
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={months}
                      label="Months"
                      onChange={handleChange}
                    >
                      <MenuItem value={12}>12 Months</MenuItem>
                      <MenuItem value={6}>6 Months</MenuItem>
                      <MenuItem value={3}>3 Months</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container alignItems="end" spacing={3}>
                {/* <Grid item xs={4}>
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
                </Grid> */}
                <Grid item xs={12}>
                  {/* <img
                    src={
                      theme.palette.mode === "light"
                        ? "/images/Chart1_Light.png"
                        : "/images/Chart1_Dark.png"
                    }
                    width="100%"
                  /> */}
                  {/* <ColumnChart chartData={chartData} /> */}
                  <div style={{ maxWidth: "630px", position: "relative" }}>
                    {summaryLoading && (
                      <SyncLoader
                        color={theme.palette.primary.main}
                        loading={true}
                        size={15}
                        speedMultiplier={0.5}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "30%",
                          zIndex: 100,
                        }}
                      />
                    )}
                    <div
                      id="chart"
                      className={{ ...chartContainer }}
                      style={{ opacity: summaryLoading && 0.5 }}
                    >
                      <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={280}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 3 }}>
            {" "}
            <Grid
              container
              direction="column"
              // justifyContent="space-between"
              // alignItems="center"
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
                    Orders
                  </Typography>
                  <Typography
                    variant="medium"
                    color="text.main"
                    sx={{ fontWeight: 400 }}
                  >
                    Last {months} months overview
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  {/* <IconButton>
                    <MenuIcon color={theme.palette.text.light} />
                  </IconButton> */}
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Months
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={months}
                      label="Months"
                      onChange={handleChange}
                    >
                      <MenuItem value={12}>12 Months</MenuItem>
                      <MenuItem value={6}>6 Months</MenuItem>
                      <MenuItem value={3}>3 Months</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container alignItems="end" spacing={3}>
                {/* <Grid item xs={4}>
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
                </Grid> */}
                <Grid item xs={12}>
                  {/* <img
                    src={
                      theme.palette.mode === "light"
                        ? "/images/Chart1_Light.png"
                        : "/images/Chart1_Dark.png"
                    }
                    width="100%"
                  /> */}
                  {/* <ColumnChart chartData={chartData} /> */}
                  <div style={{ maxWidth: "630px", position: "relative" }}>
                    {summaryLoading && (
                      <SyncLoader
                        color={theme.palette.primary.main}
                        loading={true}
                        size={15}
                        speedMultiplier={0.5}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "30%",
                          zIndex: 100,
                        }}
                      />
                    )}
                    <div
                      id="chart"
                      className={{ ...chartContainer }}
                      style={{ opacity: summaryLoading && 0.5 }}
                    >
                      <AreaChart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={280}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
