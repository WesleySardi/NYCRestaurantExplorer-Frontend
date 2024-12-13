// components/ToastContainer.js
import { Toaster } from "react-hot-toast";

const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Personalização dos tipos de toast
        success: {
          duration: 3000,
          style: {
            background: "#4BB543", // verde para sucesso
            color: "#fff",
            borderRadius: "8px",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: "#FF4D4D", // vermelho para erro
            color: "#fff",
            borderRadius: "8px",
          },
        },
      }}
    />
  );
};

export default ToastContainer;
