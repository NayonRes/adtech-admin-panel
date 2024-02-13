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

const RoleList = () => {
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

    for (let i = 0; i < 3; i++) {
      let cells = [];

      for (let j = 0; j < 2; j++) {
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
    let newUrl = `api/user`;
    getData("", newUrl);
  };
  const getData = async (pageNO, newUrl) => {
    setLoading(true);
    // setUserList([]);
    setMessage("");
   
     
   
    
    let url = "api/role";
    let res = await getDataWithToken(url, adtech_admin_panel.token);
    console.log("res", res);
    if (res?.status === 401) {
      logout();
      return;
    }

    if (res?.status > 199 && res?.status < 300) {
     
      
      if (res.data.data.length > 0) {
        setList(res.data.data);
      } else {
        setMessage(res.data.message);
        setList([]);
      }
    } else {
      setMessage(res.data.message);
    }
    setLoading(false);
  };
  const getRoles = async (pageNO, newUrl) => {
    setRoleMessage("");
    let url = "api/role";
    let res = await getDataWithToken(url, adtech_admin_panel.token);
    console.log("res", res);
    if (res?.status === 401) {
      logout();
      return;
    }
    if (res?.status === 401) {
      logout();
      return;
    }
    if (res?.status > 199 && res?.status < 300) {
      if (res.data.data.length > 0) {
        setRoles(res.data.data);
      } else {
        setRoleMessage("No data found");
        setRoles([]);
      }
    }
  };

  useEffect(() => {
    // setLoading(true);
    // getRoles();
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
                  Role List
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
           
          </Grid>
        </Grid>
      
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
                <TableCell>Name</TableCell>
                
                <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                list?.length > 0 &&
                list?.map((row, i) => (
                  <TableRow
                  key={i}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        // color: `${theme.palette.primary.main}`,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        textTransform:"capitalize"
                      }}
                    >
                      {row?.name}
                    </TableCell>
                  
                   
                    <TableCell
                      sx={{ whiteSpace: "nowrap", p: 0 }}
                      align="right"
                    >
                      <IconButton
                        aria-label="edit"
                        component={Link}
                        to={`/update-role/${row?.id}`}
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
      
      </Paper>
    </div>
  );
};

export default RoleList;
