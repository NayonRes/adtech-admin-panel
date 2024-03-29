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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import DetailDialog from "../order/DetailDialog";
const AddTicket = () => {
  const theme = useTheme();
  const { adtech_admin_panel, logout } = useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [message, setMessage] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, settoDate] = useState(null);
  const [createdStartTime, setCreatedStartTime] = useState(null);
  const [createdEndTime, setCreatedEndTime] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [downloadloading, setDownloadloading] = useState(false);
  const [open, setOpen] = useState(false);

  const [openRefund, setOpenRefund] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDetailClickOpen = (data) => {
    setDetailData(data);
    setOpenDetailDialog(true);
  };

  const handleDetailClose = () => {
    setDetailData({});
    setOpenDetailDialog(false);
  };
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
    let cellNo = adtech_admin_panel?.permission?.some(
      (el) => el.name === "complain-create"
    )
      ? 16
      : 15;
    for (let i = 0; i < 25; i++) {
      let cells = [];

      for (let j = 0; j < cellNo; j++) {
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

  const onSubmit = async (newStatus) => {
    // let err = false;
    // setErrors({});

    setUpdateLoading(true);
    if (!title.trim()) {
      handleSnakbarOpen("Please enter title", "error");
      document.getElementById("title").focus();
      setUpdateLoading(false);
      return;
    }
    if (!description.trim()) {
      handleSnakbarOpen("Please enter description", "error");
      document.getElementById("description").focus();
      setUpdateLoading(false);
      return;
    }
    try {
      let data = {
        title: title,
        order_id: updateId,
        description: description,
      };
      let response = await axios({
        url: `/api/complain`,
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${adtech_admin_panel.token}`,
        },
      });

      if (response?.status > 199 && response?.status < 300) {
        handleSnakbarOpen("Successfully", "success");
        handleClose();
        setTitle("");
        setDescription("");
        setUpdateLoading(false);
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
    // getData();
  }, []);

  return (
    <div>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs="auto">
            <Grid container alignItems="center" spacing={1}>
              {/* <Grid item xs="auto">
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
              </Grid> */}
              <Grid item xs="auto">
                <Typography
                  variant="base"
                  color="text.main"
                  sx={{ fontWeight: 500 }}
                >
                  Add Ticket
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
          {/* <Grid item xs="auto">
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
          </Grid> */}
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
            {/* <Grid item lg={2}>
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
            </Grid>*/}

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
                <TableCell>Note</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Created At</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Updated At</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Created By</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Updated By</TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Order Status
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Payment Status
                </TableCell>
                {/* {adtech_admin_panel?.permission?.some(
                  (el) => el.name === "order-update"
                ) && ( */}
                <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                  Actions
                </TableCell>
                {/* )} */}
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
                    <TableCell>
                      {row?.divisions?.toString()}
                      {/* {row?.divisions?.map((item, i) =>
                        row?.divisions.length < i + 2 ? (
                          <span key={i}>{item}</span>
                        ) : (
                          <span key={i}>{item}&nbsp;,</span>
                        )
                      )} */}
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
                      {row?.note === null
                        ? "-------"
                        : row?.note === ""
                        ? "-------"
                        : row?.note}
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

                    <TableCell align="center">
                      {row?.status === "Complete" ? (
                        <Chip
                          label={row?.status}
                          variant="outlined"
                          color="success"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      ) : row?.status === "Pending" ? (
                        <Chip
                          label={row?.status}
                          variant="outlined"
                          color="warning"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      ) : (
                        <Chip
                          label={row?.status}
                          variant="outlined"
                          color="info"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {row.payment?.status === "Success" ? (
                        <Chip
                          label={row.payment?.status}
                          variant="outlined"
                          color="success"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      ) : row.payment?.status === "Failed" ? (
                        <Chip
                          label={row.payment?.status}
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      ) : (
                        <Chip
                          label={row.payment?.status}
                          variant="outlined"
                          color="warning"
                          size="small"
                          sx={{ minWidth: "75px", textAlign: "center" }}
                        />
                      )}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                      {adtech_admin_panel?.permission?.some(
                        (el) => el.name === "complain-create"
                      ) && (
                        <>
                          <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            // startIcon={
                            //   <PlaylistPlayOutlinedIcon
                            //     style={{ position: "relative", top: -1 }}
                            //   />
                            // }
                            onClick={() => handleClickOpen(row?.id)}
                          >
                            Create Ticket
                          </Button>{" "}
                          &nbsp;
                        </>
                      )}
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
        <DialogContent sx={{ minWidth: "350px", maxWidth: "350px" }}>
          <Typography
            variant="h5"
            component="div"
            style={{ marginBottom: "20px" }}
          >
            Create Ticket
          </Typography>
          <TextField
            fullWidth
            id="title"
            label="Title"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            id="description"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ pt: 0, pb: 1.5, px: 3 }}>
          <Button
            color="text"
            sx={{ color: theme.palette.text.light }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            // size="small"
            style={{
              minHeight: "37px",
              minWidth: "130px",
            }}
            endIcon={
              <SendOutlinedIcon
                style={{ position: "relative", top: -2, fontSize: "16px" }}
              />
            }
            disabled={updateLoading}
            onClick={() => onSubmit("Publish")}
          >
            {updateLoading === false && <>&nbsp;&nbsp; Submit</>}
            <PulseLoader
              color={"#353b48"}
              loading={updateLoading}
              size={10}
              speedMultiplier={0.5}
            />{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <DetailDialog
        openDetailDialog={openDetailDialog}
        setOpenDetailDialog={setOpenDetailDialog}
        handleDetailClickOpen={handleDetailClickOpen}
        handleDetailClose={handleDetailClose}
        detailData={detailData}
      />
    </div>
  );
};

export default AddTicket;
