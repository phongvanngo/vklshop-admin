import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-yellow-600",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export default function CustomReactToastify() {
  return (
    <ToastContainer
      toastClassName={({ type }) =>
        contextClass[type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      bodyClassName={() => "text-sm font-white font-med block p-3"}
      position="bottom-left"
      autoClose={3000}
    />
  );
}

// usage

// import { toast } from "react-toastify";
// toast.warning("Custom Style Notification with css class!", {
//   position: toast.POSITION.BOTTOM_RIGHT,
// });
