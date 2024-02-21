import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import MenuIcon from "../icons/MenuIcon";
import { useTheme } from "@mui/material/styles";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import Collapse from "@mui/material/Collapse";
import { getDataWithToken } from "../services/GetDataService";
import { AuthContext } from "../context/AuthContext";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Tables = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [message, setMessage] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, settoDate] = useState(null);
  const [createdStartTime, setCreatedStartTime] = useState(null);
  const [createdEndTime, setCreatedEndTime] = useState(null);

  const handleChangePage = (event, newPage) => {
    let pageNo = newPage + 1;
    getData(pageNo);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, rowsPerPage));
    setPage(0);
  };
  const pageLoading = () => {
    let rows = [];

    for (let i = 0; i < 25; i++) {
      let cells = [];

      for (let j = 0; j < 8; j++) {
        cells.push(
          <TableCell key={j} sx={{ py: 1.5 }}>
            <Skeleton></Skeleton>
          </TableCell>
        );
      }

      rows.push(<TableRow key={i}>{cells}</TableRow>);
    }

    return rows;
  };
  const clearFilter = (event) => {
    setName("");
    setEmail("");
    setmobileNo("");
    setStatus("");
    setCreatedStartTime(null);
    setCreatedEndTime(null);
    setPage(0);
    let newUrl = `api/customer`;
    getData("", newUrl);
  };
  const getData = async (pageNO, newUrl) => {
    setLoading(true);
    // setUserList([]);
    setMessage("");
    let newPageNO;
    let url;
    if (pageNO) {
      newPageNO = pageNO;
    } else {
      newPageNO = 1;
    }
    if (newUrl) {
      url = newUrl;
    } else {
      let newStatus = status;
      let newCreatedStartTime = "";
      let newCreatedEndTime = "";
      if (status === "None") {
        newStatus = "";
      }
      if (createdStartTime !== null) {
        // newCreatedStartTime = moment(createdStartTime).format(
        //   "YYYY-MM-DD HH:mm:ss"
        // );
        newCreatedStartTime = dayjs(createdStartTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (createdEndTime !== null) {
        // newCreatedEndTime = moment(createdEndTime).format(
        //   "YYYY-MM-DD HH:mm:ss"
        // );
        newCreatedEndTime = dayjs(createdEndTime).format("YYYY-MM-DD HH:mm:ss");
      }

      url = `api/customer?name=${name.trim()}&email=${encodeURIComponent(
        email.trim()
      )}&mobile=${encodeURIComponent(
        mobileNo.trim()
      )}&gender=${gender}&status=${newStatus}&from=${newCreatedStartTime}&to=${newCreatedEndTime}&page=${newPageNO}`;
    }

    let res = await getDataWithToken(url, adtech_admin_panel.token);
    console.log("res", res);
    if (res?.status === 401 || res?.status === 403) {
      logout();
      return;
    }

    if (res?.status > 199 && res?.status < 300) {
      setTotalData(res.data.data.total);
      setRowsPerPage(res.data.data.per_page);
      if (res.data.data.data.length > 0) {
        setList(res.data.data.userList);
      } else {
        setMessage(res.data.message);
        setList([]);
      }
    } else {
      setMessage(res.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs="auto">
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs="auto">
                {" "}
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: `${theme.palette.primary.light}`,
                  }}
                >
                  <ListAltOutlinedIcon
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  />
                </Avatar>
              </Grid>
              <Grid item xs="auto">
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Customer List
                </Typography>

                {/* <Breadcrumbs
                  aria-label="breadcrumb"
                  // className={classes.breadcrumbsStyle}
                >
                  <Link to="/">Home</Link>
                  <Link to="/">Users</Link>
                  <Link to="#">List of Users</Link>
                </Breadcrumbs> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="outlined"
              size="small"
              disableElevation
              startIcon={
                openFilter ? (
                  <FilterListOffOutlinedIcon />
                ) : (
                  <FilterListOutlinedIcon />
                )
              }
              onClick={() => setOpenFilter(!openFilter)}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Collapse in={openFilter}>
          <Grid container alignItems="center" spacing={2} sx={{ mt: 0.5 }}>
            <Grid item lg={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item lg={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item lg={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Mobile No"
                variant="outlined"
                size="small"
                value={mobileNo}
                onChange={(e) => setmobileNo(e.target.value)}
              />
            </Grid>
            <Grid item lg={2}>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                className="xs_select"
              >
                <InputLabel id="demo-status-outlined-label">Status</InputLabel>
                <Select
                  labelId="demo-status-outlined-label"
                  id="demo-status-outlined"
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value={1}>Success</MenuItem>
                  <MenuItem value={0}>Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  // className="xs_input"
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                  renderInput={(props) => <TextField {...props} />}
                  label="Created Starting Time"
                  value={createdStartTime}
                  onChange={(newValue) => {
                    setCreatedStartTime(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="xs_input"
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                  renderInput={(props) => <TextField {...props} />}
                  label="Created Ending Time"
                  value={createdEndTime}
                  onChange={(newValue) => {
                    setCreatedEndTime(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item lg={10}></Grid>
            <Grid item lg={2}>
              <Grid container alignItems="center" spacing={{ lg: 6, xl: 3 }}>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="info"
                    disableElevation
                    sx={{ minHeight: "40px" }}
                    onClick={clearFilter}
                  >
                    <ReplayOutlinedIcon />
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="info"
                    disableElevation
                    sx={{ minHeight: "40px" }}
                    onClick={(event) => handleChangePage(event, 0)}
                  >
                    <SearchOutlinedIcon />
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
      <Paper sx={{ p: 3, pb: 0 }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "75px" }}>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell>Document Number</TableCell>
                <TableCell>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      Country
                    </Grid>
                    <Grid item xs="auto">
                      <IconButton>
                        {/* <FilterIcon color={theme.palette.text.light} /> */}{" "}
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      Created At{" "}
                    </Grid>
                    <Grid item xs="auto">
                      <IconButton>
                        {/* <FilterIcon color={theme.palette.text.light} /> */}{" "}
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    {/* <MenuIcon color={theme.palette.text.light} /> */}
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <TableRow
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar alt="Remy Sharp" src="/images/user.png" />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: `${theme.palette.primary.main}`,
                      fontWeight: 500,
                    }}
                  >
                    Cameron Williamson
                  </TableCell>
                  <TableCell>Passport</TableCell>
                  <TableCell>2641365884226</TableCell>
                  <TableCell>Iraq</TableCell>
                  <TableCell
                    sx={{
                      color: `${theme.palette.text.light}`,
                    }}
                  >
                    17 June 2022
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      {/* <MenuIcon color={theme.palette.text.light} /> */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Grid container alignItems="center">
              <Grid item xs={12}> */}
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* </Grid>
            </Grid> */}
      </Paper>
    </div>
  );
};

export default Tables;
