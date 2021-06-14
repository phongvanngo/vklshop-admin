import PageLoader from "common/PageLoader/PageLoader";
import React from "react";
import AppRoutes from "routes";
import "./App.css";
import ErrorNotificationDialog from "common/Notification/ErrorNotification.dialog";
import CustomReactToastify from "common/ReactToastifyCustom";
import ErrorBoundary from "ErrorBoundary";

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="App">
      <ErrorBoundary>
        <ErrorNotificationDialog />
        <PageLoader />
        <AppRoutes />
        <CustomReactToastify />
      </ErrorBoundary>
    </div>
  );
}

export default App;
