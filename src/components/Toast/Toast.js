import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom common toast handler
const Toast = {
  success: (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored", 
      style: {
        background: "#00695c",
        color: "#fff",
        fontWeight: "500",
      },
      icon: "✅",
    }),

  error: (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      style: {
        background: "#d32f2f",
        color: "#fff",
        fontWeight: "500",
      },
      icon: "❌",
    }),

  info: (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      style: {
        background: "#0288d1",
        color: "#fff",
        fontWeight: "500",
      },
      icon: "ℹ️",
    }),

  warning: (message) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      style: {
        background: "#f9a825", // amber
        color: "#000",
        fontWeight: "500",
      },
      icon: "⚠️",
    }),
};

export default Toast;
