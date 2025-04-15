import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info'
) => {
  switch (type) {
    case 'success':
      toast.success(message, { position: 'bottom-center' });
      break;
    case 'error':
      toast.error(message, { position: 'bottom-center' });
      break;
    case 'info':
      toast.info(message, { position: 'bottom-center' });
      break;
    default:
      toast(message, { position: 'bottom-center' });
  }
};

export const Toast = () => <ToastContainer />;
