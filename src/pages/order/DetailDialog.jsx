import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import BoostItems from "./BoostItems";
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Objective from "./Objective";
import Budget from "./Budget";
import GenderAndAge from "./GenderAndAge";
import Location from "./Location";
import PulseLoader from "react-spinners/PulseLoader";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const DetailDialog = ({
  openDetailDialog,
  setOpenDetailDialog,
  handleDetailClickOpen,
  handleDetailClose,
  detailData,
}) => {
  const theme = useTheme();

  function getValueByKey(array, keyToFind) {
    console.log("array", array);
    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].key === keyToFind) {
          return array[i].value;
        }
      }
    }
    return null; // Return null if key is not found
  }

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
  return (
    <div>
      <Dialog
        open={openDetailDialog}
        onClose={handleDetailClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        sx={{ ".MuiDialog-paper": { p: 3 } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontWeight: 600, position: "relative" }}
        >
          {/* {"Order Details"}{" "}
          <IconButton
            sx={{ position: "absolute", right: 0, top: -10 }}
            onClick={handleDetailClose}
          >
            <ClearOutlinedIcon />
          </IconButton> */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs="auto">
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs="auto">
                  {" "}
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: `${theme.palette.primary.light}`,
                    }}
                  >
                    <ListAltOutlinedIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "18px",
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
                    Order Details
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
            <Grid item xs="auto" sx={{ textAlign: "right" }}>
              <IconButton
                // sx={{ position: "absolute", right: 0, top: -10 }}
                onClick={handleDetailClose}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ minWidth: "350px" }}>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Invoice No: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.id}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Boost Item: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.promotion}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Boost Objective: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.promotion_objective}
              </span>
            </Typography>
            {getValueByKey(detailData?.objectives, "media") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Message Media: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "media")?.join(", ")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "lead") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Lead Items: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "lead")?.join(", ")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "post_link") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Post Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "post_link")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "video_link") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Video Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "video_link")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "website_link") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Website Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "website_link")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "link") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Link: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "link")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "title") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Title: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "title")}
                </span>
              </Typography>
            )}
            {getValueByKey(detailData?.objectives, "description") !== null && (
              <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
                {" "}
                Description: &nbsp;
                <span style={{ color: theme.palette.text.main }}>
                  {getValueByKey(detailData?.objectives, "description")}
                </span>
              </Typography>
            )}

            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Package Amount: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                TK. {detailData?.amount}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Boosting Period: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.promotion_period} Day
                {parseInt(detailData?.promotion_period) > 1 && "s"}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Gender: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.gender}{" "}
                {detailData?.gender === "Both" && "(Male and Female)"}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Age: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.min_age} To {detailData?.max_age} Years
              </span>
            </Typography>
            <Table sx={{ mb: 1 }}>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ p: 0, width: "75px" }}>
                    {" "}
                    <Typography variant="base" color="text.light">
                      {" "}
                      Location: &nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0 }}>
                    {" "}
                    <Typography variant="base" color="text.main">
                      {detailData?.divisions?.join(", ")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Created At: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {" "}
                {moment(detailData?.created_at).format(
                  "DD MMM, YYYY, HH:mm:ss a"
                )}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Updated At: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {checkCreateAndUpdatedSame(
                  detailData?.created_at,
                  detailData?.updated_at
                ) ? (
                  "N/A"
                ) : (
                  <>
                    {moment(detailData?.updated_at).format(
                      "DD MMM, YYYY, HH:mm:ss a"
                    )}
                  </>
                )}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Order Status: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.status === "Complete" ? (
                  <Chip
                    label={detailData?.status}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                ) : detailData?.status === "Publish" ? (
                  <Chip
                    label={detailData?.status}
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                ) : detailData?.status === "Pending" ? (
                  <Chip
                    label={detailData?.status}
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                ) : (
                  <Chip
                    label={detailData?.status}
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                )}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Payment Method: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.payment?.payment_method}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Payment Status: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.payment?.status === "Success" ? (
                  <Chip
                    label={detailData?.payment?.status}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                ) : detailData?.payment?.status === "Failed" ? (
                  <Chip
                    label={detailData?.payment?.status}
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                ) : (
                  <Chip
                    label={detailData?.payment?.status}
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{
                      minWidth: "75px",
                      textAlign: "center",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                )}
              </span>
            </Typography>

            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Gateway TRX Id: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.payment?.gateway_trx_id}
              </span>
            </Typography>
            <Typography variant="base" color="text.light" sx={{ mb: 1 }}>
              {" "}
              Gateway Payment Id: &nbsp;
              <span style={{ color: theme.palette.text.main }}>
                {detailData?.payment?.gateway_payment_id}
              </span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions sx={{ pt: 0, pb: 1.5, justifyContent: "center" }}>
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
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading === false && <>&nbsp;&nbsp; Confirm</>}
            <PulseLoader
              color={"#353b48"}
              loading={loading}
              size={10}
              speedMultiplier={0.5}
            />{" "}
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default DetailDialog;
