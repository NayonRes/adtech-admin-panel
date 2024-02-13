import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "../user-forms/ForgotPassword";
import Login from "../user-forms/Login";
import ResetPassword from "../user-forms/ResetPassword";
import Verify from "../user-forms/Verify";
import { AuthContext } from "../../context/AuthContext";
import Tables from "../../table/Tables";
import CustomerList from "../customer/CustomerList";
// import NoMatch from "../NoMatch";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import PulseLoader from "react-spinners/PulseLoader";
import UserList from "../users/UserList";
import AddUser from "../users/AddUser";
import UpdateUser from "../users/UpdateUser";
import Dashboard from "../dashboard/Dashboard";
import Test from "../test/Test";
import AddCustomer from "../customer/AddCustomer";
import UpdateCustomer from "../customer/UpdateCustomer";
import AddOrder from "../order/AddOrder";
import RoleList from "../role/RoleList";
import UpdateRole from "../role/UpdateRole";

function PrivateRoute({ children }) {
  const { adtech_admin_panel } = useContext(AuthContext);
  // console.log("adtech_admin_panel?.data?.token", adtech_admin_panel);
  return adtech_admin_panel?.token ? children : <Navigate to="/" />;
}
function RedirectToHome({ children }) {
  const { adtech_admin_panel } = useContext(AuthContext);

  return !adtech_admin_panel?.token ? children : <Navigate to="/dashboard" />;
}
const Navigation = () => {
  const { adtech_admin_panel } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route
          path="/"
          element={
            <RedirectToHome>
              <Login />
            </RedirectToHome>
          }
        />
        <Route
          path="verify"
          element={
            <RedirectToHome>
              <Verify />
            </RedirectToHome>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="change-password"
          element={
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="user-list"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="add-user"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="update-user/:id"
          element={
            <PrivateRoute>
              <UpdateUser />
            </PrivateRoute>
          }
        />
        <Route
          path="add-customer"
          element={
            <PrivateRoute>
              <AddCustomer />
            </PrivateRoute>
          }
        />
        <Route
          path="add-order"
          element={
            <PrivateRoute>
              <AddOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="update-customer/:id"
          element={
            <PrivateRoute>
              <UpdateCustomer />
            </PrivateRoute>
          }
        />
        <Route
          path="customer-list"
          element={
            <PrivateRoute>
              <CustomerList />
            </PrivateRoute>
          }
        />
        <Route
          path="role-list"
          element={
            <PrivateRoute>
              <RoleList />
            </PrivateRoute>
          }
        />
          <Route
          path="update-role/:id"
          element={
            <PrivateRoute>
              <UpdateRole />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="*"
          element={!adtech_admin_panel.token ? <Navigate to="/" /> : <NoMatch />}
        /> */}
      </Routes>
    </div>
  );
};

export default Navigation;
