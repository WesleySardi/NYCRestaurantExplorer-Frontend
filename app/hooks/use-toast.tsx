// components/hooks/use-toast.js
import { Renderable, Toast, toast, ValueFunction } from "react-hot-toast";

export const showToast = (
  message: Renderable | ValueFunction<Renderable, Toast>,
  type: "success" | "error" // Agora só aceita 'success' ou 'error'
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      // Não há necessidade de um tipo default para 'info'
      toast(message);
  }
};

export { toast };
