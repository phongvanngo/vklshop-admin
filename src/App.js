import PageLoader from "common/PageLoader/PageLoader";
import React from "react";
import AppRoutes from "routes";
import "./App.css";
import ErrorNotificationDialog from "common/Notification/ErrorNotification.dialog";
import MyDatePicker from "common/DatePicker/MyDatePicker";

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="App">
      <ErrorNotificationDialog />
      <PageLoader />
      <AppRoutes />
    </div>
  );
}

export default App;
