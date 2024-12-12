// components/hooks/use-toast.js
import { Renderable, Toast, toast, ValueFunction } from "react-hot-toast";

export const showToast = (
  message: Renderable | ValueFunction<Renderable, Toast>
) => {
  toast(message);
};
export { toast };
