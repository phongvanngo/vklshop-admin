import PageLoader from "common/PageLoader/PageLoader";
import React from "react";
import AppRoutes from "routes";
import "./App.css";
import ErrorNotificationDialog from "common/Notification/ErrorNotification.dialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="App">
      <ErrorNotificationDialog />
      <PageLoader />
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
