import React, { useState, useEffect, useContext } from "react";
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
  Skeleton,
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
import { AuthContext } from "../../context/AuthContext";
import { getDataWithToken } from "../../services/GetDataService";
const Dashboard = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statData, setStatData] = useState({});

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Amount (Tk) ",
        data: [],
      },
      {
        name: "Amount (Tk) ",
        data: [76, 85, 101, 98, 87, 105, 91],
      },
      // {
      //   name: "Free Cash Flow",
      //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      // },
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
          text: "Complete Orders Amounts",
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
    setSummaryLoading(true);
    let newMonth = months;
    if (month) {
      newMonth = month;
    }
    let url = "api/dashboard/orders?monty=12";
    let res = await getDataWithToken(url, adtech_admin_panel.token);
    // let url2 = "api/dashboard/customers?monty=12";
    // let res2 = await getDataWithToken(url2, adtech_admin_panel.token);

    console.log("res", res);
    // console.log("res2", res2);
    if (res?.status === 401) {
      logout();
      return;
    }
    if (res?.status > 199 && res?.status < 300) {
      let names = Object.keys(res.data.data);
      let data1 = Object.values(res.data.data).map(obj => obj.complete !== undefined ? obj.complete : 0);
      // let years = [];
      let newTotalSummary = 0;
      let newTotalVerified = 0;
      if (res.data.data.length > 0) {
        res.data.data.summary.map((item) => {
          newTotalSummary = newTotalSummary + parseInt(item.totalSummary);
          newTotalVerified = newTotalVerified + parseInt(item.totalVerified);
          // names.push(item.month + " " + item.year);
          // years.push(item.year);
          data1.push(item.totalSummary);
        });
      }
      console.log("data1", data1);
      console.log("names ===========================================", names);
      setSummaryList(res.data.data.summary);
      setTotalSummary(newTotalSummary);
      setTotalVerified(newTotalVerified);
      setChartData({
        ...chartData,
        series: [
          {
            name: "Amounts (Tk) ",
            data: data1,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            categories: names,
          },
        },
      });
    } else {
      setSummaryMessage(res.data.message.toString());
    }
    setDisplay(true);
    setSummaryLoading(false);
  };
  const getData = async (pageNO, newUrl) => {
    setLoading(true);
    // setUserList([]);
    setMessage("");

    let url = "api/dashboard";
    let res = await getDataWithToken(url, adtech_admin_panel.token);

    if (res?.status === 401) {
      logout();
      return;
    }
    // if (res?.status === 401 || res?.status === 403) {
    //   logout();
    //   return;
    // }
    console.log("res.data.data", res.data.data);
    if (res?.status > 199 && res?.status < 300) {
      setStatData(res.data.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (
      adtech_admin_panel?.permission?.some(
        (el) => el.name === "dashboard-stats"
      )
    ) {
      getData();
    }
    // getSummaryOfaStore(12);
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
          {adtech_admin_panel?.permission?.some(
            (el) => el.name === "dashboard-stats"
          ) ? (
            <>
              <Typography
                variant="h6"
                color="text.main"
                sx={{ fontWeight: 500, mt: 2.5, mb: 1 }}
              >
                Orders Summary Of {getCurrentMonth()}
              </Typography>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" height={102} />
                  ) : (
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
                            <CountUp
                              delay={0}
                              end={parseInt(statData?.orders?.complete)}
                            />
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
                  )}
                </Grid>
                <Grid item xs={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" height={102} />
                  ) : (
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
                            <CountUp
                              delay={0}
                              end={parseInt(statData?.orders?.publish)}
                            />
                          </Typography>
                          <Typography
                            variant="medium"
                            color="text.main"
                            sx={{ fontWeight: 400 }}
                          >
                            Publish Orders
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  )}
                </Grid>

                <Grid item xs={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" height={102} />
                  ) : (
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
                            <CountUp
                              delay={0}
                              end={parseInt(statData?.orders?.pending)}
                            />
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
                  )}
                </Grid>
                <Grid item xs={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" height={102} />
                  ) : (
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
                            <CountUp
                              delay={0}
                              end={parseInt(statData?.orders?.refunded)}
                            />
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
                  )}
                </Grid>
              </Grid>
            </>
          ):  <Typography
          variant="h6"
          color="text.main"
          sx={{ fontWeight: 500, mt: 2.5, mb: 1 }}
        >
       You have no permission of dashboard
        </Typography>}
    
        </Grid>
{/* 
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
             
              </Grid>

              <Grid container alignItems="end" spacing={3}>
                <Grid item xs={12}>
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
                        height={350}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid> */}
        {/* <Grid item xs={6}>
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
                    Customers
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
            
                <Grid item xs={12}>
                
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
                      <AreaChart Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Dashboard;
