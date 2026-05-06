import React from 'react';
import {
  toast,
  ToastContainer,
  ToastContainerProps,
  ToastOptions,
  TypeOptions,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type ToastType = Exclude<TypeOptions, 'default'>;

export interface ShowToastOptions extends ToastOptions {
  type?: ToastType;
}

const defaultToastOptions: ToastOptions = {
  position: 'bottom-left',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

type ToastVariantFn = typeof toast.success;

const toastByType: Record<ToastType, ToastVariantFn> = {
  success: toast.success,
  error: toast.error,
  info: toast.info,
  warning: toast.warning,
};

export const showToast = (
  message: React.ReactNode,
  options?: ShowToastOptions,
) => {
  const { type = 'success', ...restOptions } = options ?? {};
  return toastByType[type](message, {
    ...defaultToastOptions,
    ...restOptions,
  });
};

showToast.success = (message: React.ReactNode, options?: ToastOptions) =>
  toast.success(message, {
    ...defaultToastOptions,
    ...options,
  });

showToast.error = (message: React.ReactNode, options?: ToastOptions) =>
  toast.error(message, {
    ...defaultToastOptions,
    ...options,
  });

showToast.info = (message: React.ReactNode, options?: ToastOptions) =>
  toast.info(message, {
    ...defaultToastOptions,
    ...options,
  });

showToast.warning = (message: React.ReactNode, options?: ToastOptions) =>
  toast.warning(message, {
    ...defaultToastOptions,
    ...options,
  });

showToast.dismiss = (toastId?: string | number) => toast.dismiss(toastId);

export interface ToastContainerProps extends ToastContainerProps {
  containerId?: string;
}

export const GlobalToastContainer: React.FC<ToastContainerProps> = ({
  ...props
}) => {
  return <ToastContainer {...defaultToastOptions} newestOnTop {...props} />;
};

export default showToast;
