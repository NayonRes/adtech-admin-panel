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
import { getDataWithToken } from "../../../services/GetDataService";
import { AuthContext } from "../../../context/AuthContext";

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
import axios from "axios";
import { useSnackbar } from "notistack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PulseLoader from "react-spinners/PulseLoader";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
const RefundedOrderList = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("Refunded");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [message, setMessage] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, settoDate] = useState(null);
  const [createdStartTime, setCreatedStartTime] = useState(null);
  const [createdEndTime, setCreatedEndTime] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [downloadloading, setDownloadloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClickOpen = (id) => {
    setUpdateId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };

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

      for (let j = 0; j < 12; j++) {
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
    setInvoiceNo("");
    // setStatus("");
    setCreatedStartTime(null);
    setCreatedEndTime(null);
    setPage(0);
    let newUrl = `api/order?status=${status}`;
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

      url = `api/order?promotion=${name.trim()}&invoice_no=${invoiceNo.trim()}&gender=${gender}&status=${newStatus}&from=${newCreatedStartTime}&to=${newCreatedEndTime}&page=${newPageNO}`;
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

  const downloadFile = async (type) => {
    setDownloadloading(true);
    // try {
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

    let url = `api/order/export?promotion=${name.trim()}&invoice_no=${encodeURIComponent(
      invoiceNo.trim()
    )}&gender=${gender}&status=${newStatus}&from=${newCreatedStartTime}&to=${newCreatedEndTime}`;

    let res = await axios({
      url: url,
      method: "get",
      headers: {
        Authorization: `Bearer ${adtech_admin_panel.token}`,
      },
      responseType: "blob", // important
    });

    if (res?.status > 199 && res?.status < 300) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `Order.${type}`);

      document.body.appendChild(link);
      link.click();

      link.remove();

      handleSnakbarOpen("File download successfully", "success");
    } else {
      const isJsonBlob = (data) =>
        data instanceof Blob && data.type === "application/json";
      const responseData = isJsonBlob(res?.data)
        ? await res?.data?.text()
        : res?.data || {};
      const responseJson =
        typeof responseData === "string"
          ? JSON.parse(responseData)
          : responseData;

      if (responseJson?.messages.length > 0) {
        handleSnakbarOpen("Something went wrong", "error");
      } else {
        handleSnakbarOpen("Something went wrong", "error");
      }
    }

    // } catch (error) {
    //   const isJsonBlob = (data) =>
    //     data instanceof Blob && data.type === "application/json";
    //   const responseData = isJsonBlob(error.response?.data)
    //     ? await error.response?.data?.text()
    //     : error.response?.data || {};
    //   const responseJson =
    //     typeof responseData === "string"
    //       ? JSON.parse(responseData)
    //       : responseData;
    //   console.log("error", responseJson);
    //   handleSnakbarOpen(responseJson?.messages.toString(), "error");
    //   handleClose();
    //   setDownloadloading(false);
    // }
    setDownloadloading(false);
  };

  const updateStatus = async (id) => {
    // let err = false;
    // setErrors({});

    setUpdateLoading(true);
    try {
      let data = {
        status: "Complete",
      };
      let response = await axios({
        url: `/api/order/${id}/action`,
        method: "put",
        data: data,
        headers: {
          Authorization: `Bearer ${adtech_admin_panel.token}`,
        },
      });

      if (response?.status > 199 && response?.status < 300) {
        handleSnakbarOpen("Update Successfully", "success");
        getData();
      }
    } catch (error) {
      console.log("error", error);
      setUpdateLoading(false);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        logout();
        return;
      }
      if (error?.response?.status === 500) {
        handleSnakbarOpen(error?.response?.statusText, "error");
      } else {
        // setErrors(error.response.data.errors);
      }
      // handleSnakbarOpen(error.response.data.messages.toString(), "error");
      // if (error.response.data.errors.length < 1) {
      //   handleSnakbarOpen("Something went wrong", "error");
      // }

      setUpdateLoading(false);
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
                  Refunded Order List
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
            {adtech_admin_panel?.permission?.some(
              (el) => el.name === "order-export"
            ) && (
              <>
                <Button
                  variant="outlined"
                  // size="small"
                  disableElevation
                  startIcon={<FileDownloadOutlinedIcon />}
                  onClick={() => downloadFile("xlsx")}
                >
                  Download
                </Button>
                &nbsp;&nbsp;{" "}
              </>
            )}
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
                label="Invoice No"
                variant="outlined"
                size="small"
                className="xs_input"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </Grid>
            <Grid item lg={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="promotion"
                variant="outlined"
                size="small"
                className="xs_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            {/* <Grid item lg={2}>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    // color: "#718096",
                    padding: "7px 14px",
                  },
                }}
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
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
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
                <TableCell sx={{ whiteSpace: "nowrap" }}>Invoice No</TableCell>
                <TableCell>Promotion</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                  Promotion Period
                </TableCell>
                <TableCell>gender</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Location</TableCell>
                {/* <TableCell align="center">Status</TableCell> */}
                <TableCell>Remarks</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Created At</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Updated At</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Created By</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Updated By</TableCell>
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
                      {row?.id}
                    </TableCell>
                    <TableCell>{row?.promotion}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      Tk. {row?.amount}
                    </TableCell>
                    <TableCell align="center">
                      {row?.promotion_period}{" "}
                      {parseInt(row?.promotion_period) > 1 ? "Days" : "Day"}
                    </TableCell>
                    <TableCell>{row?.gender}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row?.min_age} - {row?.max_age}
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // maxWidth: "220px",
                          // background: "red",
                        }
                      }
                    >
                      {JSON.parse(row?.divisions)?.map((item, i) =>
                        JSON.parse(row?.divisions).length < i + 2 ? (
                          <span key={i}>{item}</span>
                        ) : (
                          <span key={i}>{item}&nbsp;,</span>
                        )
                      )}
                    </TableCell>

                    {/* <TableCell align="center">
                     
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
                    </TableCell> */}
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
                      {" "}
                      {moment(row?.updated_at).format(
                        "DD MMM, YYYY, HH:mm:ss a"
                      )}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {row.created_by !== null ? row.created_by.name : "Self"}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {row.updated_by !== null ? row.updated_by.name : "Self"}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        sx={{ ".MuiDialog-paper": { p: 3 } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontWeight: 600, position: "relative" }}
        >
          {"Are you sure?"}{" "}
          <IconButton
            sx={{ position: "absolute", right: 0, top: -10 }}
            onClick={handleClose}
          >
            <ClearOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ minWidth: "350px" }}>
          <DialogContentText id="alert-dialog-description">
            You want to pass it to publish list!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 0, pb: 1.5 }}>
          <Button
            variant="contained"
            disableElevation
            // size="small"
            style={{
              minHeight: "37px",
              minWidth: "180px",
            }}
            endIcon={
              <SendOutlinedIcon
                style={{ position: "relative", top: -2, fontSize: "16px" }}
              />
            }
            disabled={updateLoading}
            onClick={updateStatus}
          >
            {updateLoading === false && <>&nbsp;&nbsp; Confirm</>}
            <PulseLoader
              color={"#353b48"}
              loading={updateLoading}
              size={10}
              speedMultiplier={0.5}
            />{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RefundedOrderList;
