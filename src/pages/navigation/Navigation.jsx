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
import PendingOrderList from "../order/order-list/PendingOrderList";
import PublishOrderList from "../order/order-list/PublishOrderList";
import CompleteOrderList from "../order/order-list/CompleteOrderList";
import RefundedOrderList from "../order/order-list/RefundedOrderList";
import AddFeedback from "../feedback/AddFeedback";
import FeedbackList from "../feedback/FeedbackList";
import UpdateFeedback from "../feedback/UpdateFeedback";
import CustomerOrderList from "../customer/CustomerOrderList";
import AddTicket from "../ticket/AddTicket";
import TicketList from "../ticket/TicketList";

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
          path="customer-order-list/:id"
          element={
            <PrivateRoute>
              <CustomerOrderList />
            </PrivateRoute>
          }
        />
         <Route
          path="add-feedback"
          element={
            <PrivateRoute>
              <AddFeedback />
            </PrivateRoute>
          }
        />
          <Route
          path="feedback-list"
          element={
            <PrivateRoute>
              <FeedbackList />
            </PrivateRoute>
          }
        />
        <Route
          path="update-feedback/:id"
          element={
            <PrivateRoute>
              <UpdateFeedback />
            </PrivateRoute>
          }
        />
         <Route
          path="add-ticket"
          element={
            <PrivateRoute>
              <AddTicket />
            </PrivateRoute>
          }
        />
          <Route
          path="ticket-list"
          element={
            <PrivateRoute>
              <TicketList />
            </PrivateRoute>
          }
        />
        <Route
          path="update-ticket/:id"
          element={
            <PrivateRoute>
              <UpdateFeedback />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="add-customer"
          element={
            <PrivateRoute>
              <AddCustomer />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="add-order"
          element={
            <PrivateRoute>
              <AddOrder />
            </PrivateRoute>
          }
        /> */}

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
          path="pending-order-list"
          element={
            <PrivateRoute>
              <PendingOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="publish-order-list"
          element={
            <PrivateRoute>
              <PublishOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="complete-order-list"
          element={
            <PrivateRoute>
              <CompleteOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="refunded-order-list"
          element={
            <PrivateRoute>
              <RefundedOrderList />
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
