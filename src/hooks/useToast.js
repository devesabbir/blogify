import { toast } from "react-toastify";

const useToast = () => {
  const defaultOptions = {};
  const toastSuccess = (message, options = defaultOptions) => {
    toast.success(message, options);
  };
  const toastError = (message, options = defaultOptions) => {
    toast.error(message, options);
  };

  const toastInfo = (message, options = defaultOptions) => {
    toast.info(message, options);
  };

  const toastWarning = (message, options = defaultOptions) => {
    toast.warn(message, options);
  };

  return {
    toastSuccess,
    toastError,
    toastInfo,
    toastWarning,
  };
};

export default useToast;
