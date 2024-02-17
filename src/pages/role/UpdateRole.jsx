import React, { useState, useEffect, useContext } from "react";
import { getDataWithToken } from "../../services/GetDataService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "@mui/material/Skeleton";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { handlePostData } from "../../services/PostDataService";

import { useTheme } from "@mui/material/styles";
// const useStyles = makeStyles((theme) => ({
//   form: {
//     padding: "50px",
//     background: "#fff",
//     borderRadius: "10px",
//     textAlign: "center",
//     width: "400px",
//     boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//     margin: "auto",
//   },
//   tableBodyStyle: {
//     "& tr:nth-of-type(odd)": {
//       background: "#f3f3f3",
//     },
//     "& tr:last-child": {
//       background: "none",
//     },

//     "& tr:hover": {
//       // cursor: "pointer",
//       background: "#DCDCDC",
//     },
//     "& tr:last-child:hover": {
//       // cursor: "default",
//       background: "none",
//     },
//     "& td": {
//       padding: "10px 16px",
//     },
//     [theme.breakpoints.down("xl")]: {
//       "& td": {
//         // paddingTop: "12px",
//         // paddingBottom: "12px",
//         padding: "12px 6px",
//       },
//       // "& td:nth-child(n+3)": {
//       //   paddingLeft: "0px",
//       // },
//     },
//   },
//   tableHeadStyle: {
//     background: "#353b48",
//     "& th": {
//       color: "#fff",
//       fontSize: "16px",
//     },
//     // [theme.breakpoints.down("xl")]: {
//     //   "& th:nth-child(n+2)": {
//     //     paddingLeft: "10px",
//     //   },
//     // },
//   },
//   titleStyle: {
//     fontSize: "14px !important",
//     fontWeight: "600 !important",
//     [theme.breakpoints.down("xl")]: {
//       fontSize: "14px !important",
//     },
//   },
//   checkboxStyle: {
//     "& span": {
//       fontSize: "14px",
//       fontWeight: 600,
//       [theme.breakpoints.down("xl")]: {
//         fontSize: "14px",
//       },
//     },
//   },
//   checkboxStyle2: {
//     "& span": {
//       // fontSize: "20px",
//       // fontWeight: 600,
//       fontSize: "14px",
//       [theme.breakpoints.down("xl")]: {
//         fontSize: "14px",
//       },
//     },
//   },
//   checkboxStyle3: {
//     "& span": {
//       fontSize: "13px",
//       // fontWeight: 600,
//       [theme.breakpoints.down("xl")]: {
//         fontSize: "13px",
//       },
//     },
//   },
// }));

const UpdateRole = () => {
  // const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
  const [
    permissionListWithAssignedPermissions,
    setPermissionListWithAssignedPermissions,
  ] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [permissionMessage, setPermissionMessage] = useState("");
  const [createRoleLoading, setCreateRoleLoading] = useState(false);
  const { adtech_admin_panel, logout, login } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [openCollapse, setOpenCollapse] = useState("");
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

  const pageLoading = () => {
    let content = [];

    for (let i = 0; i < 6; i++) {
      content.push(
        <Grid item xs={3} xl={3} key={i}>
          <div
          //  className={classes.checkboxStyle}
          >
            <Skeleton></Skeleton>
          </div>
          <div
            style={{
              paddingLeft: "48px",
              boxSizing: "border-box",
            }}
          >
            <br />
            <Skeleton></Skeleton>
            <br />
            <Skeleton></Skeleton>
            <br />
          </div>
        </Grid>
      );
    }
    return content;
  };
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }));
  const updateRoleById = async () => {
    try {
      setCreateRoleLoading(true);
      let permissionsList = [];
      console.log(
        "permissionListWithAssignedPermissions",
        permissionListWithAssignedPermissions
      );
      permissionListWithAssignedPermissions.map((item) => {
        item.permissions.map((el) => {
          if (el.isPermitted) {
            permissionsList.push(el.id);
          }
        });
      });

      let data = {
        name: roleName,
        permissions: permissionsList,
      };

      let response = await axios({
        url: `api/role/${id}`,
        method: "put",
        data: data,
        headers: {
          Authorization: `Bearer ${adtech_admin_panel.token}`,
        },
      });

      if (response?.status === 401) {
        logout();
        return;
      }
      if (response?.status > 199 && response?.status < 300) {
        handleSnakbarOpen("Updated Successfully", "success");
      } else {
        handleSnakbarOpen("Something went wrong", "error");
        if (response.data.messages.length < 1) {
          handleSnakbarOpen("Something went wrong", "error");
        }
      }
      // } catch (error) {
      //   console.log("error", error);
      //   handleSnakbarOpen(error.response.data.messages.toString(), "error");
      //   if (error.response.data.messages.length < 1) {
      //     handleSnakbarOpen("Something went wrong", "error");
      //   }

      // }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      if (error?.response?.status === 500) {
        handleSnakbarOpen(error?.response?.statusText, "error");
      } else {
        setErrors(error.response.data.errors);
      }
      // handleSnakbarOpen(error.response.data.messages.toString(), "error");
      // if (error.response.data.errors.length < 1) {
      //   handleSnakbarOpen("Something went wrong", "error");
      // }
    }
    setCreateRoleLoading(false);
  };

  const getPermissionInfo = async () => {
    setLoading(true);
    let myNewData = [];
    let url = "api/permission";
    let allPermission = await getDataWithToken(url, adtech_admin_panel.token);

    // let allPermission = await getDataWithToken(`api/module-permissions`,adtech_admin_panel, logout,login);
    if (allPermission?.status === 401) {
      logout();
      return;
    }

    if (allPermission?.status > 199 && allPermission?.status < 300) {
      for (const key in allPermission.data.data) {
        let newObj = allPermission.data.data[key].map((obj) => ({
          ...obj,
          isPermitted: false,
        }));

        let myObj = {
          title: key,
          allPermitted: false,
          permissions: newObj,
        };
        myNewData.push(myObj);
      }
      // setPermissionList(myNewData);
      setLoading(false);
      return myNewData;
    } 
    else {
      setPermissionMessage("Something went wrong");
      // if (allPermission.data.messages.length < 1) {
      //   setPermissionMessage("Something went wrong");
      // }
      setLoading(false);
      return myNewData;
    }
    setLoading(false);
  };
  const getAssaignedPermissionInfo = async (id) => {
    const permissionList2 = await getPermissionInfo();
    if (permissionList2 !== undefined) {
      console.log("permissionList2", permissionList2);
      setLoading(true);
      let myNewData = [];

      let allAssaignedPermission = await getDataWithToken(
        `api/role/${id}`,
        adtech_admin_panel.token
      );
      console.log("allAssaignedPermission", allAssaignedPermission);
      if (allAssaignedPermission?.status === 401) {
        logout();
        return;
      }
      if (
        allAssaignedPermission?.status > 199 &&
        allAssaignedPermission?.status < 300
      ) {
        setRoleName(allAssaignedPermission.data.data.name);
        let assignedPermissions = allAssaignedPermission.data.data.permissions;

        console.log("assignedPermissions", assignedPermissions);
        permissionList2?.map((item) => {
          let newObj = item.permissions.map((obj) => {
            return {
              ...obj,
              // isPermitted: assignedPermissions.includes(obj.id),
              isPermitted: assignedPermissions.some((el) => el.id === obj.id),
              // children: obj.children.map((child) => ({
              //   ...child,
              //   isPermitted: assignedPermissions.includes(child.permission),
              // })),
            };
          });
          const isAnyPermissionFalse = newObj.some(
            (el) => el.isPermitted === false
          );

          let isAnyChildPermissionfalse;
          // newObj?.map((child) => {
          //   if (child?.children.length > 0) {
          //     isAnyChildPermissionfalse = child?.children?.some(
          //       (el) => el.isPermitted === false
          //     );
          //   }
          // });
          let allPermission = true;
          if (isAnyPermissionFalse || isAnyChildPermissionfalse) {
            allPermission = false;
          }
          let myObj = {
            title: item.title,
            allPermitted: allPermission,
            permissions: newObj,
          };
          myNewData.push(myObj);
        });
        console.log("myNewData", myNewData);
        setPermissionListWithAssignedPermissions(myNewData);

        setLoading(false);
      } else {
        setMessage("Something went wrong");
        // if (allAssaignedPermission.data.messages.length < 1) {
        //   setMessage("Something went wrong");
        // }
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const handlePermissionSelectByTitle = (checked, item, index) => {
    let newArray = item.permissions.map((obj) => ({
      ...obj,
      isPermitted: checked,
      // children: obj.children.map((child) => ({
      //   ...child,
      //   isPermitted: checked,
      // })),
    }));

    permissionListWithAssignedPermissions[index] = {
      ...item,
      allPermitted: checked,
      permissions: newArray,
    };
    setRefresh(!refresh);
  };
  const handlePermissionChange = (item, index, el, i) => {
    // const isAnyChildPermissionTrue = el.children.some(
    //   (el) => el.isPermitted === true
    // );
    // if (!isAnyChildPermissionTrue) {
    let newObj = {
      ...el,
      isPermitted: !el.isPermitted,
      // children: el.children.map((child) => ({
      //   ...child,
      //   isPermitted: !el.isPermitted,
      // })),
    };
    let newPermissions = item.permissions;
    item.permissions[i] = newObj;
    const isAnyPermissionFalse = newPermissions.some(
      (el) => el.isPermitted === false
    );
    // let isAnyChildPermissionfalse = newObj?.children?.some(
    //   (el) => el.isPermitted === false
    // );

    let allPermission = true;
    if (isAnyPermissionFalse) {
      allPermission = false;
    }
    permissionListWithAssignedPermissions[index] = {
      ...item,
      allPermitted: allPermission,
      permissions: newPermissions,
    };
    // }

    setRefresh(!refresh);
  };
  const handleChildPermissionChange = (item, index, el, i, child, indx) => {
    let newChildObj = {
      ...child,
      isPermitted: !child.isPermitted,
    };

    let newChildren = el.children;
    el.children[indx] = newChildObj;
    const isAnyChildPermissionTrue = newChildren.some(
      (el) => el.isPermitted === true
    );

    // let newObj = {
    //   ...el,
    //   isPermitted: isAnyChildPermissionTrue,
    //   children: newChildren,
    // };
    let newObj = {};
    if (isAnyChildPermissionTrue) {
      newObj = {
        ...el,
        isPermitted: isAnyChildPermissionTrue,
        children: newChildren,
      };
    } else {
      newObj = {
        ...el,
        children: newChildren,
      };
    }
    const isAnyChildPermissionfalse = newChildren.some(
      (el) => el.isPermitted === false
    );
    let newPermissions = item.permissions;
    item.permissions[i] = newObj;
    const isAnyPermissionFalse = newPermissions.some(
      (el) => el.isPermitted === false
    );
    let allPermission = true;
    if (isAnyPermissionFalse || isAnyChildPermissionfalse) {
      allPermission = false;
    }
    permissionListWithAssignedPermissions[index] = {
      ...item,
      allPermitted: allPermission,
      permissions: newPermissions,
    };

    setRefresh(!refresh);
  };

  useEffect(() => {
    getAssaignedPermissionInfo(id);
  }, []);
  return (
    <>
      {message.length > 0 ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "85vh" }}
        >
          <div
            style={{
              padding: "50px",
              background: "#fff",
              borderRadius: "10px",
              textAlign: "center",
              width: "400px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              margin: "auto",
            }}
          >
            <img
              src="/logo.png"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "155px" }}
            />
            <br />
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "30px" }}
            >
              {message}
            </Typography>
          </div>
        </Grid>
      ) : (
        <>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "80vh" }}
          >
            <TableContainer
              component={Paper}
              style={{
                padding: "20px 16px 16px",
                boxSizing: "border-box",
                maxWidth: "900px",
              }}
            >
              {roleName.length > 0 && (
                <Typography
                  variant="h5"
                  color="info"
                  gutterBottom
                  component="div"
                  style={{ textAlign: "center" }}
                >
                  <span style={{ textTransform: "capitalize" }}>
                    {roleName}
                  </span>{" "}
                  has access to
                </Typography>
              )}
              <br />

              {/* <Paper style={{ padding: "24px", boxSizing: "border-box" }}> */}
              <Grid container spacing={3}>
                {loading && pageLoading()}

                {permissionListWithAssignedPermissions?.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography
                          variant="small"
                          gutterBottom
                          component="div"
                          sx={{
                            fontSize: "14px !important",
                            fontWeight: "600 !important",
                            textAlign: "right",
                            marginTop: "8px",
                            color: "#487eb0",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={9}
                        style={{
                          paddingLeft: "48px",
                          boxSizing: "border-box",
                        }}
                      >
                        <Grid container spacing={0}>
                          <Grid
                            item
                            xs={4}
                            sx={{
                              "& span": {
                                // fontSize: "20px",
                                // fontWeight: 600,
                                fontSize: "14px",
                                [theme.breakpoints.down("xl")]: {
                                  fontSize: "14px",
                                },
                              },
                            }}
                          >
                            <FormControlLabel
                              control={<Checkbox size="small" />}
                              // label={item.title}
                              label="Select All"
                              checked={item.allPermitted}
                              onChange={(event) => {
                                handlePermissionSelectByTitle(
                                  event.target.checked,
                                  item,
                                  index
                                );
                              }}
                            />
                          </Grid>
                          {item.permissions?.map((el, i) => (
                            <Grid
                              item
                              xs={4}
                              key={i}
                              sx={{
                                "& span": {
                                  // fontSize: "20px",
                                  // fontWeight: 600,
                                  fontSize: "14px",
                                  [theme.breakpoints.down("xl")]: {
                                    fontSize: "14px",
                                  },
                                },
                              }}
                            >
                              <FormControlLabel
                                component="div"
                                control={<Checkbox size="small" />}
                                label={el.name}
                                checked={el.isPermitted}
                                onChange={() => {
                                  handlePermissionChange(item, index, el, i);
                                }}
                              />
                              {/* {el?.children?.length > 0 && (
                                <>
                                  <LightTooltip
                                    title="Open sub-permissions"
                                    placement="top"
                                  >
                                    <IconButton
                                      onClick={() => {
                                        if (openCollapse === el.function_name) {
                                          setOpenCollapse("");
                                        } else {
                                          setOpenCollapse(el.function_name);
                                        }
                                      }}
                                    >
                                      {openCollapse !== el.function_name ? (
                                        <KeyboardArrowUpIcon />
                                      ) : (
                                        <KeyboardArrowDownIcon />
                                      )}
                                    </IconButton>
                                  </LightTooltip>
                                  <Collapse
                                    in={openCollapse !== el.function_name}
                                    timeout="auto"
                                    unmountOnExit
                                    style={{
                                      paddingLeft: "35px",
                                      background: "#f3f3f3",
                                    }}
                                    sx={{
                                      "& span": {
                                        fontSize: "13px",
                                        // fontWeight: 600,
                                        [theme.breakpoints.down("xl")]: {
                                          fontSize: "13px",
                                        },
                                      },
                                    }}
                                  >
                                    {el?.children?.length > 0 &&
                                      el?.children?.map((child, indx) => {
                                        return (
                                          <FormControlLabel
                                            key={indx}
                                            component="div"
                                            control={<Checkbox size="small" />}
                                            label={child.function_name}
                                            checked={child.isPermitted}
                                            onChange={() => {
                                              handleChildPermissionChange(
                                                item,
                                                index,
                                                el,
                                                i,
                                                child,
                                                indx
                                              );
                                            }}
                                          />
                                        );
                                      })}
                                  </Collapse>
                                </>
                              )} */}
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              {/* </Paper> */}
              <br />
              <br />

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  disableElevation
                  disabled={createRoleLoading}
                  onClick={updateRoleById}
                  style={{
                    minWidth: "330px",
                    minHeight: "37px",
                  }}
                >
                  <PulseLoader
                    color={"#353b48"}
                    loading={createRoleLoading}
                    size={10}
                    speedMultiplier={0.5}
                  />{" "}
                  {createRoleLoading === false && "Update Role"}
                </Button>
              </div>
            </TableContainer>
          </Grid>
        </>
      )}
    </>
  );
};

export default UpdateRole;
