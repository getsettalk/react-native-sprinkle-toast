import { ToastOptions } from './types';

export type ToastRef = {
  addToast: (options: ToastOptions) => void;
  clearAll: () => void;
};

let toastRef: ToastRef | null = null;

export const setToastRef = (ref: ToastRef | null) => {
  toastRef = ref;
};

export const Toast = {
  show: (options: ToastOptions) => {
    if (toastRef) {
      toastRef.addToast(options);
    } else {
      console.warn("ToastProvider not found! Wrap your app with <ToastProvider />");
    }
  },
  hideAll: () => toastRef?.clearAll(),
};