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
import Chip from "@mui/material/Chip";
import {
  Avatar,
  Box,
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
import { getDataWithToken } from "../../services/GetDataService";
import { AuthContext } from "../../context/AuthContext";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const FeedbackList = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [companyName, setCompanyName] = useState("");

  const [status, setStatus] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [message, setMessage] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, settoDate] = useState(null);
  const [createdStartTime, setCreatedStartTime] = useState(null);
  const [createdEndTime, setCreatedEndTime] = useState(null);
  const [roles, setRoles] = useState([]);
  const [roleMessage, setRoleMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedForRole, setSelectedForUpdate] = useState({});
  const [newUpdateValue, setNewUpdateValue] = useState({});

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

      for (let j = 0; j < 13; j++) {
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
    setCompanyName("");

    setStatus("");
    setCreatedStartTime(null);
    setCreatedEndTime(null);
    setPage(0);
    let newUrl = `api/feedback`;
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
        newCreatedStartTime = dayjs(createdStartTime).format("YYYY-MM-DD");
      }
      if (createdEndTime !== null) {
        // newCreatedEndTime = moment(createdEndTime).format(
        //   "YYYY-MM-DD HH:mm:ss"
        // );
        newCreatedEndTime = dayjs(createdEndTime).format("YYYY-MM-DD");
      }

      url = `api/feedback?company=${companyName.trim()}&status=${newStatus}&from=${newCreatedStartTime}&to=${newCreatedEndTime}&page=${newPageNO}`;
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
      if (res.data?.data?.data?.length > 0) {
        setList(res.data.data.data);
      } else {
        setMessage(res.data.message);
        setList([]);
      }
    } else {
      setMessage(res.data.message);
    }
    setLoading(false);
  };
  const checkCreateAndUpdatedSame = (createdAt, updatedAt) => {
    // Convert strings to Date objects
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);

    // Compare the Date objects
    if (createdDate.getTime() === updatedDate.getTime()) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    // setLoading(true);

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
                  Feedback List
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
              // size="small"
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
                label="Company Name"
                variant="outlined"
                size="small"
                className="xs_input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
                  <MenuItem value="None">All</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="xs_input"
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                  maxDate={dayjs(new Date())}
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
                <DatePicker
                  className="xs_input"
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                  maxDate={dayjs(new Date())}
                  renderInput={(props) => <TextField {...props} />}
                  label="Created Ending Time"
                  value={createdEndTime}
                  onChange={(newValue) => {
                    setCreatedEndTime(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item lg={2}>
              <Grid container alignItems="center" spacing={{ lg: 6, xl: 3 }}>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="info"
                    disableElevation
                    size="small"
                    // sx={{ minHeight: "40px" }}
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
                    size="small"
                    sx={{ minHeight: "32px" }}
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
        <TableContainer
          style={{
            overflowX: "auto",
            minWidth: "100%",
            width: "Calc(100vw - 385px)",
            maxHeight: "Calc(100vh - 280px)",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Moto</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Reviewer Name
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Reviewer Designation
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Reviewer Website
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Video Link</TableCell>

                <TableCell align="center">Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Created At</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Updated At</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Created By</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Updated By</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                list?.length > 0 &&
                list?.map((row, i) => (
                  <TableRow
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        // color: `${theme.palette.primary.main}`,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row?.company}
                    </TableCell>
                    <TableCell sx={{ minWidth: "220px" }}>
                      {row?.moto}
                    </TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.designation}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {row?.website === null
                        ? "-------"
                        : row?.website === ""
                        ? "-------"
                        : row?.website}
                    </TableCell>
                    <TableCell>{row?.video_link}</TableCell>

                    <TableCell align="center">
                      {row.status === "Active" ? (
                        <Chip
                          label={row.status}
                          variant="outlined"
                          color="success"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      ) : (
                        <Chip
                          label={row.status}
                          variant="outlined"
                          color="warning"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ width: "190px" }}>
                      {row?.remarks === null
                        ? "-------"
                        : row?.remarks === ""
                        ? "-------"
                        : row?.remarks}
                    </TableCell>
                    <TableCell sx={{ minWidth: "90px" }}>
                      {" "}
                      {moment(row?.created_at).format(
                        "DD MMM, YYYY, HH:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell sx={{ minWidth: "90px" }}>
                      {checkCreateAndUpdatedSame(
                        row?.created_at,
                        row?.updated_at
                      ) ? (
                        "-------"
                      ) : (
                        <>
                          {moment(row?.updated_at).format(
                            "DD MMM, YYYY, HH:mm:ss a"
                          )}
                        </>
                      )}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {row.created_by !== null ? row.created_by.name : "Self"}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {row.updated_by !== null
                        ? row.updated_by.name
                        : "-------"}
                    </TableCell>
                    <TableCell
                      sx={{ whiteSpace: "nowrap", p: 0 }}
                      align="center"
                    >
                      <IconButton
                        aria-label="edit"
                        component={Link}
                        to={`/update-feedback/${row?.id}`}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {loading && pageLoading()}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && list?.length < 1 ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <strong> No Data Found</strong>
          </Box>
        ) : null}
        {list?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={totalData}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
};

export default FeedbackList;
